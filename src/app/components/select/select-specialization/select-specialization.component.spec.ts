import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpecializationComponent } from './select-specialization.component';

describe('SelectSpecializationComponent', () => {
  let component: SelectSpecializationComponent;
  let fixture: ComponentFixture<SelectSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
