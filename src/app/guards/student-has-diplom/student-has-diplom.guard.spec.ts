import { TestBed, async, inject } from '@angular/core/testing';

import { StudentHasDiplomGuard } from './student-has-diplom.guard';

describe('StudentHasDiplomGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentHasDiplomGuard]
    });
  });

  it('should ...', inject([StudentHasDiplomGuard], (guard: StudentHasDiplomGuard) => {
    expect(guard).toBeTruthy();
  }));
});
