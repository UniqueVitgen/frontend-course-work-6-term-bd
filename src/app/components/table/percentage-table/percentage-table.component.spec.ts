import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageTableComponent } from './percentage-table.component';

describe('PercentageTableComponent', () => {
  let component: PercentageTableComponent;
  let fixture: ComponentFixture<PercentageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
