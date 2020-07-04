import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailcenterComponent } from './mailcenter.component';

describe('MailcenterComponent', () => {
  let component: MailcenterComponent;
  let fixture: ComponentFixture<MailcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
