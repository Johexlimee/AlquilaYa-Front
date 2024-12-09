import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCharacteristicsValueModalComponent } from './product-characteristics-value-modal.component';

describe('ProductCharacteristicsValueModalComponent', () => {
  let component: ProductCharacteristicsValueModalComponent;
  let fixture: ComponentFixture<ProductCharacteristicsValueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCharacteristicsValueModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCharacteristicsValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
