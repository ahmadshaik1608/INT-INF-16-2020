/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HalloffameComponent } from './halloffame.component';

describe('HalloffameComponent', () => {
  let component: HalloffameComponent;
  let fixture: ComponentFixture<HalloffameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalloffameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalloffameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
