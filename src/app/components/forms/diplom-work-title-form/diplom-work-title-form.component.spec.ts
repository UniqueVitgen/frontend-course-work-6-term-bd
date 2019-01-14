import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomWorkTitleFormComponent } from './diplom-work-title-form.component';

describe('DiplomWorkTitleFormComponent', () => {
  let component: DiplomWorkTitleFormComponent;
  let fixture: ComponentFixture<DiplomWorkTitleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomWorkTitleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomWorkTitleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
