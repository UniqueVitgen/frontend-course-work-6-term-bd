import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSecretarySecComponent } from './sign-up-secretary-sec.component';

describe('SignUpSecretarySecComponent', () => {
  let component: SignUpSecretarySecComponent;
  let fixture: ComponentFixture<SignUpSecretarySecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpSecretarySecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSecretarySecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
