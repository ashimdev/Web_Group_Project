import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() VideoURL: string = '';

  constructor() { }
  ngOnInit(): void {
    console.log(this.VideoURL);
  }
}
