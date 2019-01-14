import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAdminComponent } from './department-admin.component';

describe('DepartmentAdminComponent', () => {
  let component: DepartmentAdminComponent;
  let fixture: ComponentFixture<DepartmentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
