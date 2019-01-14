import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomWorkAdminComponent } from './diplom-work-admin.component';

describe('DiplomWorkAdminComponent', () => {
  let component: DiplomWorkAdminComponent;
  let fixture: ComponentFixture<DiplomWorkAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomWorkAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomWorkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
