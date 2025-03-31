import { TestBed } from '@angular/core/testing';

import { AnimalesService } from '../services/animales.service';

describe('AnimalesService', () => {
  let service: AnimalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
