import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomWorkComponent } from './diplom-work.component';

describe('DiplomWorkComponent', () => {
  let component: DiplomWorkComponent;
  let fixture: ComponentFixture<DiplomWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
