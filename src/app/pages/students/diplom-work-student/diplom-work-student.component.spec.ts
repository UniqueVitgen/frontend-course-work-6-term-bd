import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomWorkStudentComponent } from './diplom-work-student.component';

describe('DiplomWorkStudentComponent', () => {
  let component: DiplomWorkStudentComponent;
  let fixture: ComponentFixture<DiplomWorkStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomWorkStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomWorkStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
