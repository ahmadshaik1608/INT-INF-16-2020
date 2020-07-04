import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminjobstreetComponent } from './adminjobstreet.component';

describe('AdminjobstreetComponent', () => {
  let component: AdminjobstreetComponent;
  let fixture: ComponentFixture<AdminjobstreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminjobstreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminjobstreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
