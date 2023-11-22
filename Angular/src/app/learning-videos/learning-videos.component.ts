import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultService } from '../api/default.service';
import { VideoPlaylist } from '../interfaces/video-playlsit.interface';

@Component({
  selector: 'app-learning-videos',
  templateUrl: './learning-videos.component.html',
  styleUrls: ['./learning-videos.component.scss']
})
export class LearningVideosComponent {

  public Loading = false;
  public VideoPlaylistList: VideoPlaylist[] = [];

  constructor(
    private _defaultService: DefaultService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getVideoPlaylistList();
  }

  public OnClickPlaylist(videoPlaylistID: String) {
    this._router.navigate([`learningVideos/${videoPlaylistID}`])
  }

  private getVideoPlaylistList() {
    this.Loading = true;
    this._defaultService.videoplaylistGet()
      .subscribe({
        next: (videoPlaylist: any) => {
          this.VideoPlaylistList = videoPlaylist;
          this.Loading = false;
        },
        error: (err) => {
          console.error(err);
          this.Loading = false;
        }
      });
  }
}
