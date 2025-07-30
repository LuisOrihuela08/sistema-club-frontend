import { Component, OnInit } from '@angular/core';
import { ServicioBungalowService } from '../../../shared/services/servicio-bungalow.service';
import { ModalService } from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteBungalow } from '../../../shared/models/ClienteBugalow';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import Swal from 'sweetalert2';
import { ApiReniecService } from '../../../shared/services/api-reniec.service';
import { BungalowsService } from '../../../shared/services/bungalows.service';
import { Bungalow } from '../../../shared/models/Bungalow';

@Component({
  selector: 'app-servicio-bungalow-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './servicio-bungalow-add-modal.component.html',
  styleUrl: './servicio-bungalow-add-modal.component.css'
})
export class ServicioBungalowAddModalComponent implements OnInit {

  servicioBungalow: ClienteBungalow = new ClienteBungalow();
  servicioBungalowForm!: FormGroup;
  metodosPago: MetodoPago[] = [];
  bungalows: Bungalow[] = [];


  constructor(private servicioBungalowService: ServicioBungalowService,
    private modalService: ModalService,
    private metodoPagoService: MetodoPagoService,
    private apiReniecService: ApiReniecService,
    private bungalowService: BungalowsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.servicioBungalowForm = this.fb.group({
      montoTotal: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      cliente: this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        dni: ['', Validators.required],
        telephone: ['', Validators.required],
        district: ['', Validators.required]
      }),
      bungalow: this.fb.group({
        id: ['', Validators.required]
      }),
      metodoPago: this.fb.group({
        id: ['', Validators.required]
      })
    });

    //Listar los métodos de pago
    this.getMetodosPago();

    //Listar los bungalows
    this.getBungalows();

    //Parar ver los valores agregados
    console.log(this.servicioBungalowForm.value);
    this.servicioBungalowForm.valueChanges.subscribe((value) => {
      console.log('Valores agregados: ', value);
    });
  }

  closeModalAddServicioBungalow() {
    this.modalService.$modalAddServicioBungalow.emit(false);

  }

  addServicioBungalow(): void {
    if (this.servicioBungalowForm.invalid) {
      console.log('Formulario inválido: ', this.servicioBungalowForm.invalid);
      Swal.fire({
        icon: "error",
        title: "Formulario inválido",
        text: "Por favor, completa todos los campos requeridos.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const addServicioBungalow = this.servicioBungalowForm.value;

    this.servicioBungalowService.addServicioBungalow(addServicioBungalow).subscribe({
      next: (response) => {
        console.log('Servicio de bungalow agregado exitosamente: ', response);
        Swal.fire({
          icon: "success",
          title: "Servicio de bungalow agregado",
          text: "El servicio de bungalow se ha agregado correctamente.",
          confirmButtonText: "Aceptar"
        });
        this.servicioBungalowService.notifyServicioBungalowUpdate();
        this.servicioBungalowForm.reset();
        this.closeModalAddServicioBungalow();
      },
      error: (error) => {
        console.log('Error al agregar el servicio de bungalow: ', error);
        Swal.fire({
          icon: "error",
          title: "Error al agregar servicio de bungalow",
          text: "No se pudo agregar el servicio de bungalow. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Aceptar"
        });
      }
    });
  }

  findByDni(): void {
    const dni = this.servicioBungalowForm.get('cliente.dni')?.value;

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
            this.servicioBungalowForm.get('cliente.name')?.setValue(data.nombres);
            this.servicioBungalowForm.get('cliente.lastName')?.setValue(data.apellido_paterno + ' ' + data.apellido_materno);
            this.servicioBungalowForm.get('cliente.district')?.setValue(data.distrito);
            this.servicioBungalowForm.get('cliente.dni')?.setValue(data.numero);
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

    //Esto es para obtener los bungalows
    getBungalows(): void {
      this.bungalowService.getBungalows().subscribe({
        next: (data) =>{
          this.bungalows = data;
          console.log('Bungalows obtenidos: ', this.bungalows);
        },
        error: (err) =>{
          console.error('Error al obtener los bungalows: ', err);
        }
      });
    }

  }
