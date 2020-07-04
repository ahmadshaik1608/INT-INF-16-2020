import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingallaryComponent } from './admingallary.component';

describe('AdmingallaryComponent', () => {
  let component: AdmingallaryComponent;
  let fixture: ComponentFixture<AdmingallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmingallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
