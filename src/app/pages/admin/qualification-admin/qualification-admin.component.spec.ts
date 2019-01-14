import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationAdminComponent } from './qualification-admin.component';

describe('QualificationAdminComponent', () => {
  let component: QualificationAdminComponent;
  let fixture: ComponentFixture<QualificationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
