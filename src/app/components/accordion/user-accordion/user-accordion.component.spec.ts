import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccordionComponent } from './user-accordion.component';

describe('UserAccordionComponent', () => {
  let component: UserAccordionComponent;
  let fixture: ComponentFixture<UserAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
