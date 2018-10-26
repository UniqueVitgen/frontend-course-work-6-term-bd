import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECDateFormComponent } from './secdate-form.component';

describe('SECDateFormComponent', () => {
  let component: SECDateFormComponent;
  let fixture: ComponentFixture<SECDateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECDateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
