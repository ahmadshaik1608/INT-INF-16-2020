import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaboutusComponent } from './adminaboutus.component';

describe('AdminaboutusComponent', () => {
  let component: AdminaboutusComponent;
  let fixture: ComponentFixture<AdminaboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
