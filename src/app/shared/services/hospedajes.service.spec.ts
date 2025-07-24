import { TestBed } from '@angular/core/testing';

import { HospedajesService } from './hospedajes.service';

describe('HospedajesService', () => {
  let service: HospedajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospedajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
