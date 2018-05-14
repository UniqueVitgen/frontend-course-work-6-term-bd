import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDiplomComponent } from './select-diplom.component';

describe('SelectDiplomComponent', () => {
  let component: SelectDiplomComponent;
  let fixture: ComponentFixture<SelectDiplomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDiplomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDiplomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
