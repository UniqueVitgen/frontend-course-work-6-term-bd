import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorsAccordionComponent } from './lectors-accordion.component';

describe('LectorsAccordionComponent', () => {
  let component: LectorsAccordionComponent;
  let fixture: ComponentFixture<LectorsAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorsAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
