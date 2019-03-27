import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECNumberFormComponent } from './secnumber-form.component';

describe('SECNumberFormComponent', () => {
  let component: SECNumberFormComponent;
  let fixture: ComponentFixture<SECNumberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECNumberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECNumberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
