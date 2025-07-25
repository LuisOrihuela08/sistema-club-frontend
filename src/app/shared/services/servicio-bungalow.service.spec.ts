import { TestBed } from '@angular/core/testing';

import { ServicioBungalowService } from './servicio-bungalow.service';

describe('ServicioBungalowService', () => {
  let service: ServicioBungalowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBungalowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
