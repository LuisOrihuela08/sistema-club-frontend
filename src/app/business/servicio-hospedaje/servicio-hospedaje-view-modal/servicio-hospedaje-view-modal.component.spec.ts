import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioHospedajeViewModalComponent } from './servicio-hospedaje-view-modal.component';

describe('ServicioHospedajeViewModalComponent', () => {
  let component: ServicioHospedajeViewModalComponent;
  let fixture: ComponentFixture<ServicioHospedajeViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioHospedajeViewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioHospedajeViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
