import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpLectorOrganizerComponent } from './sign-up-lector-organizer.component';

describe('SignUpLectorOrganizerComponent', () => {
  let component: SignUpLectorOrganizerComponent;
  let fixture: ComponentFixture<SignUpLectorOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpLectorOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpLectorOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
