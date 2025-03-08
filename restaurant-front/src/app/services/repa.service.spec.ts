import { TestBed } from '@angular/core/testing';

import { RepaService } from './repa.service';

describe('RepaService', () => {
  let service: RepaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
