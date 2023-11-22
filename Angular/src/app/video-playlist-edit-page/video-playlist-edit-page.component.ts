import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DefaultService } from '../api/default.service';
import { ThumbnailUploadService } from '../app-services/thumbnail-upload.service';

@Component({
  selector: 'app-video-playlist-edit-page',
  templateUrl: './video-playlist-edit-page.component.html',
  styleUrls: ['./video-playlist-edit-page.component.scss']
})
export class VideoPlaylistEditPageComponent implements OnInit {
  public videoPlaylistForm: any;
  public videoPlaylistID: string = '';
  public thumbnailFile: File | null = null; // To store the selected thumbnail image file

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private defaultService: DefaultService,
    private thumbnailUploadService: ThumbnailUploadService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.initializeForm();
    this.readRouteParameters();
  }

  public onClickSubmitForm() {
    if (this.videoPlaylistForm.valid) {
      this.uploadThumbnail();
    } else {
      // Form is invalid, display error messages
      this.markFormGroupTouched(this.videoPlaylistForm);
    }
  }

  public onThumbnailSelected(event: any) {
    this.thumbnailFile = event.target.files[0];
  }

  public onClickCancelButton() {
    this.navigateToVideoPlaylistPage();
  }

  public onClickDeleteButton(event: Event) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVideoPlaylist(this.videoPlaylistID);
      }
    });
  }

  public isInvalid(controlName: string) {
    return (
      this.videoPlaylistForm.get(controlName).invalid &&
      (this.videoPlaylistForm.get(controlName).dirty ||
        this.videoPlaylistForm.get(controlName).touched)
    );
  }

  private deleteVideoPlaylist(videoPlaylistID: string) {
    this.defaultService.videoplaylistVideoPlaylistIDDelete(videoPlaylistID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("Video Playlist deleted.");
          this.navigateToVideoPlaylistPage();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private initializeForm() {
    this.videoPlaylistForm = this.formBuilder.group({
      videoPlaylistName: ['', Validators.required],
      videoPlaylistDescription: [''],
      thumbnailFile: [null] // This control will store the selected thumbnail image file
    });
  }

  private readRouteParameters() {
    this.activatedRoute.params.subscribe(params => {
      this.videoPlaylistID = params['videoPlaylistID'];

      if (this.videoPlaylistID === "create") return;
      // this.getVideoPlaylist(this.videoPlaylistID);
    });
  }

  private uploadThumbnail() {
    const fileName = this.videoPlaylistForm.get('videoPlaylistName').value.trim().replace(/\s+/g, '-')?.toLowerCase();
    const fileExtension = this.thumbnailFile?.name.split('.').pop();
    const thumbnailFileName = fileName + '.' + fileExtension;

    // Step 1: Make a post request to get the signed URL
    this.defaultService.signedurlThumbnailPost(thumbnailFileName)
      .subscribe({
        next: (signedURLResponse: any) => {
          const signedURL = signedURLResponse.preSignedUrl;

          // Step 2: Upload the thumbnail image using the signed URL
          this.thumbnailUploadService.uploadThumbnailUsingSignedURL(signedURL, this.thumbnailFile)
            .subscribe({
              next: () => {
                // Step 3: Generate videoPlaylistThumbnailURL after successful upload
                const videoPlaylistThumbnailURL = `https://dfby7cfg73mv2.cloudfront.net/${thumbnailFileName}`;
                // Now you can proceed to create/update the video playlist with the videoPlaylistThumbnailURL
                this.createVideoPlaylist(videoPlaylistThumbnailURL);
              },
              error: (err: any) => {
                console.error(err);
                this.showErrorViaToast();
              }
            });
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private createVideoPlaylist(videoPlaylistThumbnailURL: string) {
    const videoPlaylistData = {
      videoPlaylistName: this.videoPlaylistForm.get('videoPlaylistName').value,
      videoPlaylistDescription: this.videoPlaylistForm.get('videoPlaylistDescription').value,
      thumbnailURL: videoPlaylistThumbnailURL
    };

    this.defaultService.videoplaylistPost(videoPlaylistData)
      .subscribe({
        next: () => {
          this.router.navigate(['./setting/video-playlist']);
          this.showInfoViaToast("Video Playlist Created Successfully.");
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private navigateToVideoPlaylistPage() {
    this.router.navigate(['./setting/video-playlist']);
  }

  private showInfoViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }
}
