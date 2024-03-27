import { TestBed } from '@angular/core/testing';

import { IbanValidatorService } from './iban-validator.service';

describe('IbanValidatorService', () => {
  let service: IbanValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbanValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
