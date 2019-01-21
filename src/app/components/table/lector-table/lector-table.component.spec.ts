import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorTableComponent } from './lector-table.component';

describe('LectorTableComponent', () => {
  let component: LectorTableComponent;
  let fixture: ComponentFixture<LectorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
