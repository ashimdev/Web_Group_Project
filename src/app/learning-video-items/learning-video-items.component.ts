import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DefaultService } from '../api/default.service';

@Component({
  selector: 'app-learning-video-items',
  templateUrl: './learning-video-items.component.html',
  styleUrls: ['./learning-video-items.component.scss']
})
export class LearningVideoItemsComponent implements OnInit {
  public VideoURL: string = '';
  public VideoList: any;
  public VideoTitle: string = '';
  public LoadingPage = true;
  public LoadingVideo = true;
  public SelectedVideo: any;
  /**
   *
   */
  constructor(private _defaultService: DefaultService, private _changeDetectorRef: ChangeDetectorRef) {
     
  }

  ngOnInit(): void {
    this.getVideoList();
  }

  public OnChange(videoURL: string, videoName: string) {
    this.LoadingVideo = true;
    console.warn(videoURL);
    this.VideoURL = `https://${videoURL}`;
    this.VideoTitle = videoName;
    this._changeDetectorRef.detectChanges();
     this.LoadingVideo = false;
  }
  private getVideoList() {
    this.LoadingPage = true;
    this._defaultService.videoGet()
      .subscribe({
        next: (videoList: any) => {
          this.VideoList = videoList;
          this.SelectedVideo = this.VideoList[0];
          this.VideoURL = `https://${this.VideoList[0]?.videoURL}`;
          this.VideoTitle = this.VideoList[0]?.videoName;
          this.LoadingPage = false;
          this.LoadingVideo = false;
        },
        error: (err) => {
          console.error(err);
          this.LoadingPage = false;
        }
      });
  }
}
