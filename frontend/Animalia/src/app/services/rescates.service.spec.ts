import { TestBed } from '@angular/core/testing';

import { RescatesService } from './rescates.service';

describe('RescatesService', () => {
  let service: RescatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
