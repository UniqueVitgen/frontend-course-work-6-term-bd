import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvolveComponent } from './involve.component';

describe('InvolveComponent', () => {
  let component: InvolveComponent;
  let fixture: ComponentFixture<InvolveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvolveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
