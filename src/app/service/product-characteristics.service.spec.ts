import { TestBed } from '@angular/core/testing';

import { ProductCharacteristicsService } from './product-characteristics.service';

describe('ProductCharacteristicsService', () => {
  let service: ProductCharacteristicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCharacteristicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
