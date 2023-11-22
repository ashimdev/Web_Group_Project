import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningVideoItemsComponent } from './learning-video-items.component';

describe('LearningVideoItemsComponent', () => {
  let component: LearningVideoItemsComponent;
  let fixture: ComponentFixture<LearningVideoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningVideoItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningVideoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
