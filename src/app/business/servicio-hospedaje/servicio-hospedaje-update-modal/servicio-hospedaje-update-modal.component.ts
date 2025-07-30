import { Component, Input, OnInit } from '@angular/core';
import { ClienteHospedaje } from '../../../shared/models/ClienteHospedaje';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioHospedajeService } from '../../../shared/services/servicio-hospedaje.service';
import { ModalService } from '../../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { Hospedaje } from '../../../shared/models/Hospedaje';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import { HospedajesService } from '../../../shared/services/hospedajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-hospedaje-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-hospedaje-update-modal.component.html',
  styleUrl: './servicio-hospedaje-update-modal.component.css'
})
export class ServicioHospedajeUpdateModalComponent implements OnInit{

  @Input() servicioHospedaje!: ClienteHospedaje;
  serviciosHospedaje: ClienteHospedaje = new ClienteHospedaje();
  servicioHospedajeForm!: FormGroup;
  metodosPago: MetodoPago[] = [];
  hospedajes: Hospedaje[] = [];

  constructor(private servicioHospedajeService: ServicioHospedajeService,
              private modalService: ModalService,
              private metodoPagoService:MetodoPagoService,
              private hospedajeService: HospedajesService,
              private fb: FormBuilder
  ){}


  ngOnInit(): void {
    this.servicioHospedajeForm = this.fb.group({
      cliente: this.fb.group({
        name: [this.servicioHospedaje.cliente.name],
        lastName: [this.servicioHospedaje.cliente.lastName],
        district: [this.servicioHospedaje.cliente.district],
        telephone: [this.servicioHospedaje.cliente.telephone, Validators.required],
        dni: [this.servicioHospedaje.cliente.dni]
      }),
      fechaInicio: [this.servicioHospedaje.fechaInicio, Validators.required],
      fechaFin: [this.servicioHospedaje.fechaFin, Validators.required],
      montoTotal: [this.servicioHospedaje.montoTotal, Validators.required],
      metodoPago: this.fb.group({
        id: [this.servicioHospedaje.metodoPago.id, Validators.required]
      }),
      hospedaje: this.fb.group({
        id: [this.servicioHospedaje.hospedaje.id, Validators.required]
      })
    });

    this.getMetodosPago();
    this.getHospedajes();

    console.log(this.servicioHospedajeForm.value);
    this.servicioHospedajeForm.valueChanges.subscribe((value) => {
      console.log('Formulario actualizado: ', value);
    });
  }

  closeModalUpdateServicioHospedaje(): void {
    this.modalService.$modalEditServicioHospedaje.emit(false);
  }

  updateServicioHospedaje(): void {
    if (this.servicioHospedajeForm.invalid) {
      console.log('Formulario inválido');
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }
    const updateServicioHospedaje: ClienteHospedaje = this.servicioHospedajeForm.value;

    this.servicioHospedajeService.updateServicioHospedaje(this.servicioHospedaje.id, updateServicioHospedaje).subscribe({
      next: (response) => {
        console.log('Servicio de hospedaje actualizado: ', response);
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: 'El servicio de hospedaje ha sido actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        });
        this.servicioHospedajeService.notifyServicioHospedajeUpdate();
        this.closeModalUpdateServicioHospedaje();
      },
      error: (error) => {
        console.error('Error al actualizar el servicio de hospedaje: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el servicio de hospedaje. Inténtalo de nuevo más tarde.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  //Esto es para obtener los métodos de pago
  getMetodosPago(): void {
    this.metodoPagoService.getMetodosPago().subscribe({
      next: (data) => {
        this.metodosPago = data;
        console.log('Método de pago obtenidos: ', this.metodosPago);
      },
      error: (err) => {
        console.error('Error al obtener los métodos de pago: ', err);
      }
    });
  }

  getHospedajes(): void {
    this.hospedajeService.getHospedajes().subscribe({
      next: (data) => {
        this.hospedajes = data;
        console.log('Hospedajes obtenidos: ', this.hospedajes);
      },
      error: (err) => {
        console.error('Error al obtener los hospedajes: ', err);
      }
    });
  }
}
