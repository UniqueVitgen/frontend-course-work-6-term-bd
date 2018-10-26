import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomLectorStaffComponent } from './diplom-lector-staff.component';

describe('DiplomLectorStaffComponent', () => {
  let component: DiplomLectorStaffComponent;
  let fixture: ComponentFixture<DiplomLectorStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomLectorStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomLectorStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
