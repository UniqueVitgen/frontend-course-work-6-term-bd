import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECAccordionComponent } from './secaccordion.component';

describe('SECAccordionComponent', () => {
  let component: SECAccordionComponent;
  let fixture: ComponentFixture<SECAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
