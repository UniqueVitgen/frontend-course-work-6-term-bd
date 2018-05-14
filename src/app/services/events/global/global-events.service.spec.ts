import { TestBed, inject } from '@angular/core/testing';

import { GlobalEventsService } from './global-events.service';

describe('GlobalEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalEventsService]
    });
  });

  it('should be created', inject([GlobalEventsService], (service: GlobalEventsService) => {
    expect(service).toBeTruthy();
  }));
});
