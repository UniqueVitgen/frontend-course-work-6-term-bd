import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorOrganizerComponent } from './lector-organizer.component';

describe('LectorOrganizerComponent', () => {
  let component: LectorOrganizerComponent;
  let fixture: ComponentFixture<LectorOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
