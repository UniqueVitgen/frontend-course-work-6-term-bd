import { TestBed } from '@angular/core/testing';

import { SECService } from './sec.service';

describe('SECService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SECService = TestBed.get(SECService);
    expect(service).toBeTruthy();
  });
});
