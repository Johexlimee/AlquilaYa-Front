import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductModalComponent } from './detail-product-modal.component';

describe('DetailProductModalComponent', () => {
  let component: DetailProductModalComponent;
  let fixture: ComponentFixture<DetailProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
