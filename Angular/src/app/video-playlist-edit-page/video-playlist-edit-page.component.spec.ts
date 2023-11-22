import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlaylistEditPageComponent } from './video-playlist-edit-page.component';

describe('VideoPlaylistEditPageComponent', () => {
  let component: VideoPlaylistEditPageComponent;
  let fixture: ComponentFixture<VideoPlaylistEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlaylistEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlaylistEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
