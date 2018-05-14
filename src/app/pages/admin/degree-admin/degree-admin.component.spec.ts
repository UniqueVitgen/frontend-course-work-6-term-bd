import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAdminComponent } from './degree-admin.component';

describe('DegreeAdminComponent', () => {
  let component: DegreeAdminComponent;
  let fixture: ComponentFixture<DegreeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
