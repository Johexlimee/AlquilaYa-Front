import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicsModalComponent } from './product-characteristics-modal.component';

describe('ProductCharacteristicsModalComponent', () => {
  let component: ProductCharacteristicsModalComponent;
  let fixture: ComponentFixture<ProductCharacteristicsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCharacteristicsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCharacteristicsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
