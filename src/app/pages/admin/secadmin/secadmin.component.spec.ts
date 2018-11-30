import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECAdminComponent } from './secadmin.component';

describe('SECAdminComponent', () => {
  let component: SECAdminComponent;
  let fixture: ComponentFixture<SECAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
