import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECFormComponent } from './secform.component';

describe('SECFormComponent', () => {
  let component: SECFormComponent;
  let fixture: ComponentFixture<SECFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
