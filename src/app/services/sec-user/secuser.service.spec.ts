import { TestBed } from '@angular/core/testing';

import { SECUserService } from './secuser.service';

describe('SECUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SECUserService = TestBed.get(SECUserService);
    expect(service).toBeTruthy();
  });
});
