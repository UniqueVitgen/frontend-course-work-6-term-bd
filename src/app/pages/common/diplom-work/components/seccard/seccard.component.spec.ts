import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECCardComponent } from './seccard.component';

describe('SECCardComponent', () => {
  let component: SECCardComponent;
  let fixture: ComponentFixture<SECCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
