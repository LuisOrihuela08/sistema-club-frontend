import { Component, OnInit } from '@angular/core';
import { ServicioPiscinaService } from '../../../shared/services/servicio-piscina.service';
import { ModalService } from '../../../shared/services/modal.service';
import { ClientePiscina } from '../../../shared/models/ClientePiscina';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import { CommonModule } from '@angular/common';
import { ApiReniecService } from '../../../shared/services/api-reniec.service';

@Component({
  selector: 'app-servicio-piscina-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './servicio-piscina-add-modal.component.html',
  styleUrl: './servicio-piscina-add-modal.component.css'
})
export class ServicioPiscinaAddModalComponent implements OnInit {

  servicioPiscina: ClientePiscina = new ClientePiscina();
  servicioPiscinaForm!: FormGroup;
  metodosPago: MetodoPago[] = [];

  constructor(private servicioPiscinaService: ServicioPiscinaService,
    private metodoPagoService: MetodoPagoService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private apiReniecService: ApiReniecService
  ) { }


  ngOnInit(): void {
    this.servicioPiscinaForm = this.fb.group({
      precioUnitario: ['', Validators.required],
      cantidadPersonas: ['', Validators.required],
      montoTotal: [0, Validators.required],
      // fecha: ['', Validators.required],
      metodoPago: this.fb.group({
        id: ['', Validators.required]
      }),
      cliente: this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        dni: ['', Validators.required],
        telephone: ['', Validators.required],
        district: ['', Validators.required]
      })
    });

    //Obtener los métodos de pago
    this.getMetodosPago();

    //Configurar el cálculo del monto total
    this.setupCalculoMontoTotal();

    //Parar ver los valores agregados
    console.log(this.servicioPiscinaForm.value);
    this.servicioPiscinaForm.valueChanges.subscribe((value) => {
      console.log('Valores agregados: ', value);
    })
  }

  closeModalAddServicioPiscina(): void {
    this.modalService.$modalAddServicioPiscina.emit(false);
  }

  addServicioPiscina(): void {
    if (this.servicioPiscinaForm.invalid) {
      console.log('Formulario inválido: ', this.servicioPiscinaForm.invalid);
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }
    const addServicioPiscina = this.servicioPiscinaForm.value;

    this.servicioPiscinaService.addServicioPiscina(addServicioPiscina).subscribe({
      next: (response) => {
        console.log('Servicio de piscina agregado exitosamente: ', response);
        Swal.fire({
          icon: "success",
          title: "Servicio de piscina agregado",
          text: "El servicio de piscina se ha agregado exitosamente.",
          confirmButtonText: "Aceptar"
        });

        //Notifico para actualizar la lista y cierro el modal
        this.servicioPiscinaService.notifyServicioPiscinaUpdate();
        this.servicioPiscinaForm.reset();
        this.closeModalAddServicioPiscina();
      },
      error: (error) => {
        console.error('Error al agregar el servicio de piscina: ', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el servicio de piscina. Por favor, inténtalo de nuevo.",
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

  setupCalculoMontoTotal(): void {
    this.servicioPiscinaForm.get('precioUnitario')?.valueChanges.subscribe(() => this.calcularMontoTotal());
    this.servicioPiscinaForm.get('cantidadPersonas')?.valueChanges.subscribe(() => this.calcularMontoTotal());
  }

  calcularMontoTotal(): void {
    const precio = this.servicioPiscinaForm.get('precioUnitario')?.value || 0;
    const cantidad = this.servicioPiscinaForm.get('cantidadPersonas')?.value || 0;
    const total = precio * cantidad;

    this.servicioPiscinaForm.get('montoTotal')?.setValue(total, { emitEvent: false });
  }

  findByDni(): void {
    const dni = this.servicioPiscinaForm.get('cliente.dni')?.value;

    if (!dni || dni.trim().length !== 8) {
      console.warn('DNI inválido: ', dni);
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
        this.servicioPiscinaForm.get('cliente.name')?.setValue(data.nombres);
        this.servicioPiscinaForm.get('cliente.lastName')?.setValue(data.apellido_paterno + ' ' + data.apellido_materno);
        this.servicioPiscinaForm.get('cliente.district')?.setValue(data.distrito);
        this.servicioPiscinaForm.get('cliente.dni')?.setValue(data.numero);
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




}
