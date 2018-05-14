import { TestBed, async, inject } from '@angular/core/testing';

import { LectorGuard } from './lector.guard';

describe('LectorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectorGuard]
    });
  });

  it('should ...', inject([LectorGuard], (guard: LectorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
