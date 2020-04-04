/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GivingtousComponent } from './givingtous.component';

describe('GivingtousComponent', () => {
  let component: GivingtousComponent;
  let fixture: ComponentFixture<GivingtousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivingtousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivingtousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
