import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECRoleFormComponent } from './secrole-form.component';

describe('SECRoleFormComponent', () => {
  let component: SECRoleFormComponent;
  let fixture: ComponentFixture<SECRoleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECRoleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
