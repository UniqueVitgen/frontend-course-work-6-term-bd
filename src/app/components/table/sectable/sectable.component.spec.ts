import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECTableComponent } from './sectable.component';

describe('SECTableComponent', () => {
  let component: SECTableComponent;
  let fixture: ComponentFixture<SECTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
