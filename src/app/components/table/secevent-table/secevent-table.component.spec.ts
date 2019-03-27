import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECEventTableComponent } from './secevent-table.component';

describe('SECEventTableComponent', () => {
  let component: SECEventTableComponent;
  let fixture: ComponentFixture<SECEventTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECEventTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
