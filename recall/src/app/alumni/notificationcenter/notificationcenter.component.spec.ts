import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationcenterComponent } from './notificationcenter.component';

describe('NotificationcenterComponent', () => {
  let component: NotificationcenterComponent;
  let fixture: ComponentFixture<NotificationcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
