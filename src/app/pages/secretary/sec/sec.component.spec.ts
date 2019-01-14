import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECComponent } from './sec.component';

describe('SECComponent', () => {
  let component: SECComponent;
  let fixture: ComponentFixture<SECComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
