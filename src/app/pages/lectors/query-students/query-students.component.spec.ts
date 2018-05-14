import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryStudentsComponent } from './query-students.component';

describe('QueryStudentsComponent', () => {
  let component: QueryStudentsComponent;
  let fixture: ComponentFixture<QueryStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
