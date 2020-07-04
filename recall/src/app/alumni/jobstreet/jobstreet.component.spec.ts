import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobstreetComponent } from './jobstreet.component';

describe('JobstreetComponent', () => {
  let component: JobstreetComponent;
  let fixture: ComponentFixture<JobstreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobstreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobstreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
