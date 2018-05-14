import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAdminComponent } from './faculty-admin.component';

describe('FacultyAdminComponent', () => {
  let component: FacultyAdminComponent;
  let fixture: ComponentFixture<FacultyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
