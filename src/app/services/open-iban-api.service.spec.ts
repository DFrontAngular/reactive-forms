import { TestBed } from '@angular/core/testing';

import { OpenIbanApiService } from './open-iban-api.service';

describe('ValidationService', () => {
  let service: OpenIbanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenIbanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
