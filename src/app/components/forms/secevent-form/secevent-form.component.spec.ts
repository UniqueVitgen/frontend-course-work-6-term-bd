import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECEventFormComponent } from './secevent-form.component';

describe('SECEventFormComponent', () => {
  let component: SECEventFormComponent;
  let fixture: ComponentFixture<SECEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
