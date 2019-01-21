import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationItemComponent } from './specialization-item.component';

describe('SpecializationItemComponent', () => {
  let component: SpecializationItemComponent;
  let fixture: ComponentFixture<SpecializationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
