import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhalloffameComponent } from './adminhalloffame.component';

describe('AdminhalloffameComponent', () => {
  let component: AdminhalloffameComponent;
  let fixture: ComponentFixture<AdminhalloffameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminhalloffameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminhalloffameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
