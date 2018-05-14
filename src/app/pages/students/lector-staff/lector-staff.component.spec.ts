import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorStaffComponent } from './lector-staff.component';

describe('LectorStaffComponent', () => {
  let component: LectorStaffComponent;
  let fixture: ComponentFixture<LectorStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
