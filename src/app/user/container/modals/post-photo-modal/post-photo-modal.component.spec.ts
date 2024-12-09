import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPhotoModalComponent } from './post-photo-modal.component';

describe('PostPhotoModalComponent', () => {
  let component: PostPhotoModalComponent;
  let fixture: ComponentFixture<PostPhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPhotoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
