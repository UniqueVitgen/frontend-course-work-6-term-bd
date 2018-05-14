import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpLectorComponent } from './sign-up-lector.component';

describe('SignUpLectorComponent', () => {
  let component: SignUpLectorComponent;
  let fixture: ComponentFixture<SignUpLectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpLectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpLectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
