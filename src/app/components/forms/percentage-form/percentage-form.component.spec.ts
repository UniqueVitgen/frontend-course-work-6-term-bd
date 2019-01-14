import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageFormComponent } from './percentage-form.component';

describe('PercentageFormComponent', () => {
  let component: PercentageFormComponent;
  let fixture: ComponentFixture<PercentageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
