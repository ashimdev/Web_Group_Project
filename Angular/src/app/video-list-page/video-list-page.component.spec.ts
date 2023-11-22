import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListPageComponent } from './video-list-page.component';

describe('VideoListPageComponent', () => {
  let component: VideoListPageComponent;
  let fixture: ComponentFixture<VideoListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
