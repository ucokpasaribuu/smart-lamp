import { TestBed } from '@angular/core/testing';

import { LamplistService } from './lamplist.service';

describe('LamplistService', () => {
  let service: LamplistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LamplistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
