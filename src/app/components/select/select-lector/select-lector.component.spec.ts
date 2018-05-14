import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLectorComponent } from './select-lector.component';

describe('SelectLectorComponent', () => {
  let component: SelectLectorComponent;
  let fixture: ComponentFixture<SelectLectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
