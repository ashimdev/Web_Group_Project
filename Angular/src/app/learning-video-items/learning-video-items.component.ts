import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DefaultService } from '../api/default.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learning-video-items',
  templateUrl: './learning-video-items.component.html',
  styleUrls: ['./learning-video-items.component.scss']
})
export class LearningVideoItemsComponent implements OnInit {
  public VideoURL: string = '';
  public VideoList: any;
  public VideoListAll: any;
  public VideoTitle: string = '';
  public LoadingPage = true;
  public LoadingVideo = true;
  public SelectedVideo: any;
  private _videoPlaylistID = '';
  /**
   *
   */
  constructor(private _defaultService: DefaultService, 
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef) {
     
  }

  ngOnInit(): void {
    this.readRouteParameters();
  }

  private readRouteParameters() {
    this._activatedRoute.params.subscribe(params => {
      const videoPlayslitID = params['videoPlaylistID'];
      console.warn(videoPlayslitID);
      this.getVideoList(videoPlayslitID);
     
    });
  }

  public OnChange(videoURL: string, videoName: string) {
    this.LoadingVideo = true;
    console.warn(videoURL);
    this.VideoURL = `https://d2757ktjet0bx9.cloudfront.net/${videoURL}`;
    this.VideoTitle = videoName;
    this._changeDetectorRef.detectChanges();
     this.LoadingVideo = false;
  }
  private getVideoList(videoPlaylistID: any) {
    this.LoadingPage = true;
    this._defaultService.videoGet()
      .subscribe({
        next: (videoList: any) => {
          this.VideoListAll = videoList;
          this.VideoList = this.VideoListAll.filter((a: any) => a.videoPlaylistID === videoPlaylistID);
          this.SelectedVideo = this.VideoList[0];

          this.VideoURL = `https://d2757ktjet0bx9.cloudfront.net/${this.VideoList[0]?.videoURL}`;
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
