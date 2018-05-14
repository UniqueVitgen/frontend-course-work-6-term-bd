import { TestBed, inject } from '@angular/core/testing';

import { LectorService } from './lector.service';

describe('LectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectorService]
    });
  });

  it('should be created', inject([LectorService], (service: LectorService) => {
    expect(service).toBeTruthy();
  }));
});
