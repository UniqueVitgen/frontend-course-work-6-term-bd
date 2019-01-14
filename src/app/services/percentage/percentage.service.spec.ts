import { TestBed, inject } from '@angular/core/testing';

import { PercentageService } from './percentage.service';

describe('PercentageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PercentageService]
    });
  });

  it('should be created', inject([PercentageService], (service: PercentageService) => {
    expect(service).toBeTruthy();
  }));
});
