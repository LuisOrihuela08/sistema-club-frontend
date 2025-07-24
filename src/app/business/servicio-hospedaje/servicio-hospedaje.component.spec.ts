import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioHospedajeComponent } from './servicio-hospedaje.component';

describe('ServicioHospedajeComponent', () => {
  let component: ServicioHospedajeComponent;
  let fixture: ComponentFixture<ServicioHospedajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioHospedajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioHospedajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
