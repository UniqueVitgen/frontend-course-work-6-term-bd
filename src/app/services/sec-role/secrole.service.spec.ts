import { TestBed } from '@angular/core/testing';

import { SECRoleService } from './secrole.service';

describe('SECRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SECRoleService = TestBed.get(SECRoleService);
    expect(service).toBeTruthy();
  });
});
