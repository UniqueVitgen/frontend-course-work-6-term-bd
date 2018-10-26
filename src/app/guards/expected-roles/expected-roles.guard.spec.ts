import { TestBed, async, inject } from '@angular/core/testing';

import { ExpectedRolesGuard } from './expected-roles.guard';

describe('ExpectedRolesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpectedRolesGuard]
    });
  });

  it('should ...', inject([ExpectedRolesGuard], (guard: ExpectedRolesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
