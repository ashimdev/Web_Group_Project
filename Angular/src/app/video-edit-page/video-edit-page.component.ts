import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DefaultService } from '../api/default.service';
import { VideoUploadService } from '../app-services/video-upload.service';

@Component({
  selector: 'app-video-edit-page',
  templateUrl: './video-edit-page.component.html',
  styleUrls: ['./video-edit-page.component.scss']
})
export class VideoEditPageComponent implements OnInit {
  public videoForm: any;
  public videoID: string = '';
  public videoPlaylistID: string = '';
  public videoFile: File | null = null; // To store the selected video file

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private defaultService: DefaultService,
    private videoUploadService: VideoUploadService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.initializeForm();
    this.readRouteParameters();
  }

  public onClickSubmitForm() {
    if (!this.videoFile) {
      this.showInfoViaToast("Please upload a video.");
      return;
    }
    
    if (this.videoForm.valid) {
      this.uploadVideo();
    } else {
      // Form is invalid, display error messages
      this.markFormGroupTouched(this.videoForm);
    }
  }

  public onFileSelected(event: any) {
    this.videoFile = event.target.files[0];
  }

  public onClickCancelButton() {
    this.navigateToVideoPage();
  }

  public onClickDeleteButton(event: Event) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVideo(this.videoID);
      }
    });
  }

  public isInvalid(controlName: string) {
    return (
      this.videoForm.get(controlName).invalid &&
      (this.videoForm.get(controlName).dirty ||
        this.videoForm.get(controlName).touched)
    );
  }

  private deleteVideo(videoID: string) {
    this.defaultService.videoVideoIDDelete(videoID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("Video deleted.");
          this.navigateToVideoPage();
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
    this.videoForm = this.formBuilder.group({
      videoName: ['', Validators.required],
      videoDescription: [''],
      videoFile: [null] // This control will store the selected video file
    });
  }

  private readRouteParameters() {
    this.activatedRoute.params.subscribe(params => {
      this.videoPlaylistID = params['videoPlaylistID'];

      if (this.videoID === "create") return;
      // this.getVideo(this.videoID);
    });
  }

  private uploadVideo() {
    const fileName = this.videoForm.get('videoName').value.trim().replace(/\s+/g, '-')?.toLowerCase();
    const fileExtension = this.videoFile?.name.split('.').pop();
    const videoFileName = fileName + '.' + fileExtension;

    // Step 1: Make a post request to get the signed URL
    this.defaultService.signedurlPost(videoFileName)
      .subscribe({
        next: (signedURLResponse: any) => {
          const signedURL = signedURLResponse.preSignedUrl;

          // Step 2: Upload the video using the signed URL
          this.videoUploadService.uploadVideoUsingSignedURL(signedURL, this.videoFile)
            .subscribe({
              next: () => {
                // Step 3: Generate videoURL after successful upload
                const videoURL = `d35hgyez1e212o.cloudfront.net/${fileName}-1080p.mp4`;
                // Now you can proceed to create/update the video with the videoURL
                this.createVideo(this.videoPlaylistID, videoURL);
              },
              error: (err) => {
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

  private createVideo(videoPlaylistID: string, videoURL: string) {
    const videoData = {
      videoName: this.videoForm.get('videoName').value,
      videoDescription: this.videoForm.get('videoDescription').value,
      videoURL: videoURL
    };

    this.defaultService.videoPost(videoPlaylistID, videoData)
      .subscribe({
        next: () => {
          this.router.navigate(['./setting/video']);
          this.showInfoViaToast("Video Created Successfully.");
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private navigateToVideoPage() {
    this.router.navigate(['./setting/video']);
  }

  private showInfoViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }
}
