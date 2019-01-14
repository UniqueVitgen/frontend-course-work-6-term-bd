import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrganizerComponent } from './sign-up-organizer.component';

describe('SignUpOrganizerComponent', () => {
  let component: SignUpOrganizerComponent;
  let fixture: ComponentFixture<SignUpOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
