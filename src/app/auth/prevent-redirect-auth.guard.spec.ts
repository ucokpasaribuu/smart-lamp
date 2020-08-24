import { TestBed } from '@angular/core/testing';

import { PreventRedirectAuthGuard } from './prevent-redirect-auth.guard';

describe('PreventRedirectAuthGuard', () => {
  let guard: PreventRedirectAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventRedirectAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
