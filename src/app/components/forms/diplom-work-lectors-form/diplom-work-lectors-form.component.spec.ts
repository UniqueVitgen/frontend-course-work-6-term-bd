import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomWorkLectorsFormComponent } from './diplom-work-lectors-form.component';

describe('DiplomWorkLectorsFormComponent', () => {
  let component: DiplomWorkLectorsFormComponent;
  let fixture: ComponentFixture<DiplomWorkLectorsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomWorkLectorsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomWorkLectorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
