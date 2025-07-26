import { TestBed } from '@angular/core/testing';

import { ServicioHospedajeService } from './servicio-hospedaje.service';

describe('ServicioHospedajeService', () => {
  let service: ServicioHospedajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioHospedajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
