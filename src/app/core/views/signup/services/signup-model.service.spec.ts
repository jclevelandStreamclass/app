import { TestBed } from '@angular/core/testing';

import { SignupModelService } from './signup-model.service';

describe('SignupModelService', () => {
  let service: SignupModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
