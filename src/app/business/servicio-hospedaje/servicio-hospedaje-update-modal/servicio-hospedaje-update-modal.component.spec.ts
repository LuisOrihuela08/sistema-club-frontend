import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioHospedajeUpdateModalComponent } from './servicio-hospedaje-update-modal.component';

describe('ServicioHospedajeUpdateModalComponent', () => {
  let component: ServicioHospedajeUpdateModalComponent;
  let fixture: ComponentFixture<ServicioHospedajeUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioHospedajeUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioHospedajeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
