import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DefaultService } from '../api/default.service';

@Component({
  selector: 'app-video-list-page',
  templateUrl: './video-list-page.component.html',
  styleUrls: ['./video-list-page.component.scss']
})
export class VideoListPageComponent implements OnInit {

  public Loading = false;
  public VideoList: any = [];

  constructor(
    private _defaultService: DefaultService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVideoList();
  }

  public onClickEditButton(videoID: string) {
    this.router.navigate([`./setting/video/${videoID}`]);
  }

  public onClickCreateButton() {
    this.router.navigate([`./setting/video/create`]);
  }

  public onClickDeleteButton(event: Event, videoID: string) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget(),
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteVideo(videoID);
      }
    });
  }

  private deleteVideo(videoID: string) {
    this._defaultService.videoVideoIDDelete(videoID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("Video deleted.");
          this.getVideoList();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private showInfoViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }

  private getVideoList() {
    this.Loading = true;
    this._defaultService.videoGet()
      .subscribe({
        next: (videoList: any) => {
          this.VideoList = videoList.sort(this.dynamicSort("videoName"));
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
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }

}
