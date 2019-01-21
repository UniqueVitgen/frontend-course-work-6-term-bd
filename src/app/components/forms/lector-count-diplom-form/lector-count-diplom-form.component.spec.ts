import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorCountDiplomFormComponent } from './lector-count-diplom-form.component';

describe('LectorCountDiplomFormComponent', () => {
  let component: LectorCountDiplomFormComponent;
  let fixture: ComponentFixture<LectorCountDiplomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorCountDiplomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorCountDiplomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
