import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminalmnijobstreetComponent } from './adminalmnijobstreet.component';

describe('AdminalmnijobstreetComponent', () => {
  let component: AdminalmnijobstreetComponent;
  let fixture: ComponentFixture<AdminalmnijobstreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminalmnijobstreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminalmnijobstreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
