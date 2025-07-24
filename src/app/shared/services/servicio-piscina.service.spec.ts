import { TestBed } from '@angular/core/testing';

import { ServicioPiscinaService } from './servicio-piscina.service';

describe('ServicioPiscinaService', () => {
  let service: ServicioPiscinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPiscinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
