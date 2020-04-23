import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnidirectoryComponent } from './alumnidirectory.component';

describe('AlumnidirectoryComponent', () => {
  let component: AlumnidirectoryComponent;
  let fixture: ComponentFixture<AlumnidirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnidirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnidirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
