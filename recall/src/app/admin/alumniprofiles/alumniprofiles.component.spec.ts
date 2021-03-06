import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniprofilesComponent } from './alumniprofiles.component';

describe('AlumniprofilesComponent', () => {
  let component: AlumniprofilesComponent;
  let fixture: ComponentFixture<AlumniprofilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniprofilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
