import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDiplomWorkFormComponent } from './mark-diplom-work-form.component';

describe('MarkDiplomWorkFormComponent', () => {
  let component: MarkDiplomWorkFormComponent;
  let fixture: ComponentFixture<MarkDiplomWorkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkDiplomWorkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDiplomWorkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
