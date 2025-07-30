import { Component, Input, OnInit } from '@angular/core';
import { ServicioPiscinaService } from '../../../shared/services/servicio-piscina.service';
import { ModalService } from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientePiscina } from '../../../shared/models/ClientePiscina';
import { CommonModule } from '@angular/common';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-piscina-update-modal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './servicio-piscina-update-modal.component.html',
  styleUrl: './servicio-piscina-update-modal.component.css'
})
export class ServicioPiscinaUpdateModalComponent implements OnInit{

  @Input() servicioPiscina!: ClientePiscina; // Recibe el objeto ClientePiscina desde el componente padre
  serviciosPiscina: ClientePiscina = new ClientePiscina();
  servicioPiscinaForm!: FormGroup;

  metodosPago: MetodoPago[] = [];

  constructor(private servicioPiscinaService: ServicioPiscinaService,
              private modalService: ModalService,
              private fb: FormBuilder,
              private metodoPagoService: MetodoPagoService
  ){}

  ngOnInit(): void {
    this.servicioPiscinaForm = this.fb.group({
      cliente: this.fb.group({
        name: [this.servicioPiscina.cliente.name],
        lastName: [this.servicioPiscina.cliente.lastName],
        district: [this.servicioPiscina.cliente.district],
        telephone: [this.servicioPiscina.cliente.telephone, Validators.required],
        dni: [this.servicioPiscina.cliente.dni],
      }),
      precioUnitario: [this.servicioPiscina.precioUnitario, Validators.required],
      cantidadPersonas: [this.servicioPiscina.cantidadPersonas, Validators.required],
      montoTotal: [this.servicioPiscina.montoTotal],
      metodoPago: this.fb.group({
        id: [this.servicioPiscina.metodoPago.id, Validators.required]
      })
    });

    this.getMetodosPago();


    console.log(this.servicioPiscinaForm.value);
    this.servicioPiscinaForm.valueChanges.subscribe((value) => {
      console.log('Valores actuales del formulario: ', value);
    })
  }


  closeModalUpdateServicioPiscina(): void{
    this.modalService.$modalEditServicioPiscina.emit(false);
  }

  updateServicioPiscina(): void {
    if (this.servicioPiscinaForm.invalid) {
      console.log('Formulario inválido');
      Swal.fire({
        icon: "warning",
              title: "Formulario incompleto",
              text: "Por favor, completa todos los campos antes de continuar.",
              confirmButtonText: "Aceptar"
      });
      return;
    }

    const servicioPiscinaUpdate: ClientePiscina = this.servicioPiscinaForm.value;

    this.servicioPiscinaService.updateServicioPiscina(this.servicioPiscina.id, servicioPiscinaUpdate).subscribe({
      next: (response) => {
        console.log('Servicio de piscina actualizado: ', response);
        this.servicioPiscinaService.notifyServicioPiscinaUpdate();
        Swal.fire({
          icon: 'success',
          title: 'Servicio de piscina editado',
          text: 'El servicio de piscina ha sido editado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.closeModalUpdateServicioPiscina();
      },
      error: (error) => {
        console.error('Error al actualizar el servicio de piscina: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Error al editar el servicio de piscina',
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
}
