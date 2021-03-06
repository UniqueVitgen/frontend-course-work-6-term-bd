import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAdminComponent } from './news-admin.component';

describe('NewsAdminComponent', () => {
  let component: NewsAdminComponent;
  let fixture: ComponentFixture<NewsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
