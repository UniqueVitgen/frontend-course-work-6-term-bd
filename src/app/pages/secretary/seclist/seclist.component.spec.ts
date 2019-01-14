import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SECListComponent } from './seclist.component';

describe('SECListComponent', () => {
  let component: SECListComponent;
  let fixture: ComponentFixture<SECListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SECListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SECListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
