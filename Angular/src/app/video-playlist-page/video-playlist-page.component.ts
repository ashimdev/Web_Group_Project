import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VideoPlaylist } from '../interfaces/video-playlsit.interface';
import { DefaultService } from '../api/default.service';

@Component({
  selector: 'app-video-playlist-page',
  templateUrl: './video-playlist-page.component.html',
  styleUrls: ['./video-playlist-page.component.scss']
})
export class VideoPlaylistPageComponent implements OnInit {

  public Loading = false;
  public VideoPlaylistList: VideoPlaylist[] = [];

  constructor(
    private _defaultService: DefaultService,
    private confirmationService: ConfirmationService,
    private service: MessageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getVideoPlaylistList();
  }

  public OnClickEditButton(videoPlaylistID: string) {
    this._router.navigate([`./setting/videoPlaylist/${videoPlaylistID}`]);
  }

  public OnClickUploadVideo(videoPlaylistID: string) {
    this._router.navigate([`./setting/videoPlaylist/${videoPlaylistID}/uploadVideo`]);
  }

  public OnClickCreateButton() {
    this._router.navigate([`./setting/videoPlaylist/create`]);
  }

  public OnClickDeleteButton(event: Event, videoPlaylistID: string) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget(),
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVideoPlaylist(videoPlaylistID);
      }
    });
  }

  private deleteVideoPlaylist(videoPlaylistID: string) {
    this._defaultService.videoplaylistVideoPlaylistIDDelete(videoPlaylistID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("Video Playlist deleted.");
          this.getVideoPlaylistList();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private showInfoViaToast(message: string) {
    this.service.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }

  private getVideoPlaylistList() {
    this.Loading = true;
    this._defaultService.videoplaylistGet()
      .subscribe({
        next: (videoPlaylist: any) => {
          this.VideoPlaylistList = videoPlaylist.sort(this.dynamicSort("videoPlaylistName"));
          this.Loading = false;
        },
        error: (err) => {
          console.error(err);
          this.Loading = false;
        }
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  private dynamicSort(property: string) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

}
