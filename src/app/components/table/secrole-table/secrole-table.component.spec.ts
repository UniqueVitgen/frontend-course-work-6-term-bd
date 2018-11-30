import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECRoleTableComponent } from './secrole-table.component';

describe('SECRoleTableComponent', () => {
  let component: SECRoleTableComponent;
  let fixture: ComponentFixture<SECRoleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECRoleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECRoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
