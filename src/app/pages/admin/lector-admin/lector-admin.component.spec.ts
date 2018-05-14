import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorAdminComponent } from './lector-admin.component';

describe('LectorAdminComponent', () => {
  let component: LectorAdminComponent;
  let fixture: ComponentFixture<LectorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
