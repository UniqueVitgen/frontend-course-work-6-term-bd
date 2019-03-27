import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomWorkCardComponent } from './diplom-work-card.component';

describe('DiplomWorkCardComponent', () => {
  let component: DiplomWorkCardComponent;
  let fixture: ComponentFixture<DiplomWorkCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomWorkCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomWorkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
