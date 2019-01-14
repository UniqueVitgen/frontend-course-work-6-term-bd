import { TestBed } from '@angular/core/testing';

import { PostOrganizationService } from './post-organization.service';

describe('PostOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostOrganizationService = TestBed.get(PostOrganizationService);
    expect(service).toBeTruthy();
  });
});
