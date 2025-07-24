import { TestBed } from '@angular/core/testing';

import { BungalowsService } from './bungalows.service';

describe('BungalowsService', () => {
  let service: BungalowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BungalowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
