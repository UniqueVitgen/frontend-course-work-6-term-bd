import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECRoleAdminComponent } from './secrole-admin.component';

describe('SECRoleAdminComponent', () => {
  let component: SECRoleAdminComponent;
  let fixture: ComponentFixture<SECRoleAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECRoleAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECRoleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
