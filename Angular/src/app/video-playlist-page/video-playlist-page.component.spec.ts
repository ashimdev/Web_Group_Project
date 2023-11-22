import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlaylistPageComponent } from './video-playlist-page.component';

describe('VideoPlaylistPageComponent', () => {
  let component: VideoPlaylistPageComponent;
  let fixture: ComponentFixture<VideoPlaylistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlaylistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlaylistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
