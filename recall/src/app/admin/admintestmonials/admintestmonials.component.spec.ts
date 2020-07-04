import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintestmonialsComponent } from './admintestmonials.component';

describe('AdmintestmonialsComponent', () => {
  let component: AdmintestmonialsComponent;
  let fixture: ComponentFixture<AdmintestmonialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintestmonialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintestmonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
