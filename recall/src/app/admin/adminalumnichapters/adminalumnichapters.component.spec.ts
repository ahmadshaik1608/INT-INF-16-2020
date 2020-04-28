import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminalumnichaptersComponent } from './adminalumnichapters.component';

describe('AdminalumnichaptersComponent', () => {
  let component: AdminalumnichaptersComponent;
  let fixture: ComponentFixture<AdminalumnichaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminalumnichaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminalumnichaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
