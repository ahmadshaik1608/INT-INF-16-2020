import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnichaptersComponent } from './alumnichapters.component';

describe('AlumnichaptersComponent', () => {
  let component: AlumnichaptersComponent;
  let fixture: ComponentFixture<AlumnichaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnichaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnichaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
