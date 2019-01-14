import { TestBed } from '@angular/core/testing';

import { SECEventService } from './secevent.service';

describe('SECEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SECEventService = TestBed.get(SECEventService);
    expect(service).toBeTruthy();
  });
});
