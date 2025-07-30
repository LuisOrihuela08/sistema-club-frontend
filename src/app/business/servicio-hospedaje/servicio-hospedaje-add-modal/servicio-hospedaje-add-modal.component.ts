import { Component, OnInit } from '@angular/core';
import { ServicioHospedajeService } from '../../../shared/services/servicio-hospedaje.service';
import { ModalService } from '../../../shared/services/modal.service';
import { ClienteHospedaje } from '../../../shared/models/ClienteHospedaje';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { Hospedaje } from '../../../shared/models/Hospedaje';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import { HospedajesService } from '../../../shared/services/hospedajes.service';
import { ApiReniecService } from '../../../shared/services/api-reniec.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-hospedaje-add-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-hospedaje-add-modal.component.html',
  styleUrl: './servicio-hospedaje-add-modal.component.css'
})
export class ServicioHospedajeAddModalComponent implements OnInit {

  servicioHospedaje: ClienteHospedaje = new ClienteHospedaje();
  servicioHospedajeForm!: FormGroup;
  metodosPago: MetodoPago[] = [];
  hospedajes: Hospedaje[] = [];

  constructor(private servicioHospedajeService: ServicioHospedajeService,
    private modalService: ModalService,
    private metodoPagoService: MetodoPagoService,
    private hospedajeService: HospedajesService,
    private fb: FormBuilder,
    private apiReniecService: ApiReniecService
  ) { }


  ngOnInit(): void {
    this.servicioHospedajeForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      montoTotal: ['', Validators.required],
      cliente: this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        dni: ['', Validators.required],
        telephone: ['', Validators.required],
        district: ['', Validators.required]
      }),
      hospedaje: this.fb.group({
        id: ['', Validators.required]
      }),
      metodoPago: this.fb.group({
        id: ['', Validators.required]
      })
    });

    //Para listar los métodos de pago y hospedajes
    this.getMetodosPago();
    this.getHospedajes();

    console.log(this.servicioHospedajeForm.value);
    this.servicioHospedajeForm.valueChanges.subscribe((value) => {
      console.log('Formulario actualizado: ', value);
    });
  }

  closeModalAddServicioHospedaje(): void {
    this.modalService.$modalAddServicioHospedaje.emit(false);
  }

  addServicioHospedaje(): void {
    if (this.servicioHospedajeForm.invalid) {
      console.log('El formulario es inválido');
      Swal.fire({
        icon: "error",
        title: "Formulario inválido",
        text: "Por favor, completa todos los campos requeridos.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const addServicioHospedaje: ClienteHospedaje = this.servicioHospedajeForm.value;

    this.servicioHospedajeService.addServicioHospedaje(addServicioHospedaje).subscribe({
      next: (response) => {
        console.log('Servicio de hospedaje agregado exitosamente: ', response);
        Swal.fire({
          icon: "success",
          title: "Servicio de hospedaje agregado",
          text: "El servicio de hospedaje se ha agregado correctamente.",
          confirmButtonText: "Aceptar"
        });
        this.servicioHospedajeService.notifyServicioHospedajeUpdate();
        this.servicioHospedajeForm.reset();
        this.closeModalAddServicioHospedaje();
      },
      error: (error) => {
        console.error('Error al agregar el servicio de hospedaje: ', error);
        Swal.fire({
          icon: "error",
          title: "Error al agregar servicio",
          text: "No se pudo agregar el servicio de hospedaje. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Aceptar"
        });
      }
    });
  }

  findByDni(): void {
    const dni = this.servicioHospedajeForm.get('cliente.dni')?.value;

    if (!dni || dni.trim().length !== 8) {
      console.error('DNI inválido');
      Swal.fire({
        icon: "warning",
        title: "DNI inválido",
        text: "Por favor, ingresa un DNI válido de 8 dígitos.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    this.apiReniecService.getDniData(dni).subscribe({
      next: (response: any) => {
        const data = response.data;
        console.log('Datos obtenidos del DNI: ', data);
        this.servicioHospedajeForm.get('cliente.name')?.setValue(data.nombres);
        this.servicioHospedajeForm.get('cliente.lastName')?.setValue(data.apellido_paterno + ' ' + data.apellido_materno);
        this.servicioHospedajeForm.get('cliente.district')?.setValue(data.distrito);
        this.servicioHospedajeForm.get('cliente.dni')?.setValue(data.numero);
      },
      error: (error) => {
        console.error('Error al obtener los datos del DNI: ', error);
        Swal.fire({
          icon: "error",
          title: "Error al buscar DNI",
          text: "No se pudo obtener los datos del DNI. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Aceptar"
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
    this.hospedajeService.getHospedajeDisponibles().subscribe({
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
