import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationAdminComponent } from './specialization-admin.component';

describe('SpecializationAdminComponent', () => {
  let component: SpecializationAdminComponent;
  let fixture: ComponentFixture<SpecializationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
