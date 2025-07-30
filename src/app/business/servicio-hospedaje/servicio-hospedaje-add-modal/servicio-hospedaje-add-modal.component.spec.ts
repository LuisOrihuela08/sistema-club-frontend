import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioHospedajeAddModalComponent } from './servicio-hospedaje-add-modal.component';

describe('ServicioHospedajeAddModalComponent', () => {
  let component: ServicioHospedajeAddModalComponent;
  let fixture: ComponentFixture<ServicioHospedajeAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioHospedajeAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioHospedajeAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
