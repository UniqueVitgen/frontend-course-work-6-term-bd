import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSecretaryComponent } from './select-secretary.component';

describe('SelectSecretaryComponent', () => {
  let component: SelectSecretaryComponent;
  let fixture: ComponentFixture<SelectSecretaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSecretaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
