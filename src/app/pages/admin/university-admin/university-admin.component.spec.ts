import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityAdminComponent } from './university-admin.component';

describe('UniversityAdminComponent', () => {
  let component: UniversityAdminComponent;
  let fixture: ComponentFixture<UniversityAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
