import { TestBed } from '@angular/core/testing';

import { ProductCharacteristicsValueService } from './product-characteristics-value.service';

describe('ProductCharacteristicsValueService', () => {
  let service: ProductCharacteristicsValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCharacteristicsValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
