import { TestBed, inject } from '@angular/core/testing';

import { DiplomWorkService } from './diplom-work.service';

describe('DiplomWorkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiplomWorkService]
    });
  });

  it('should be created', inject([DiplomWorkService], (service: DiplomWorkService) => {
    expect(service).toBeTruthy();
  }));
});
