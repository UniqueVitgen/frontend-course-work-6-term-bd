import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageControlComponent } from './percentage-control.component';

describe('PercentageControlComponent', () => {
  let component: PercentageControlComponent;
  let fixture: ComponentFixture<PercentageControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
