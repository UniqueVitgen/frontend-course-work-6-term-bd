import { TestBed } from '@angular/core/testing';

import { SECStaffService } from './secstaff.service';

describe('SECStaffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SECStaffService = TestBed.get(SECStaffService);
    expect(service).toBeTruthy();
  });
});
