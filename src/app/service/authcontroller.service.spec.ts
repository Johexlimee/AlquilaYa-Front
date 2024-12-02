import { TestBed } from '@angular/core/testing';

import { AuthcontrollerService } from './authcontroller.service';

describe('AuthcontrollerService', () => {
  let service: AuthcontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthcontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
