import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECUserFormComponent } from './secuser-form.component';

describe('SECUserFormComponent', () => {
  let component: SECUserFormComponent;
  let fixture: ComponentFixture<SECUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
