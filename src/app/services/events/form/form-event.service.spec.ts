import { TestBed, inject } from '@angular/core/testing';

import { FormEventService } from './form-event.service';

describe('FormEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormEventService]
    });
  });

  it('should be created', inject([FormEventService], (service: FormEventService) => {
    expect(service).toBeTruthy();
  }));
});
