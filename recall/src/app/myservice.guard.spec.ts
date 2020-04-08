import { TestBed } from '@angular/core/testing';

import { MyserviceGuard } from './myservice.guard';

describe('MyserviceGuard', () => {
  let guard: MyserviceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyserviceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
