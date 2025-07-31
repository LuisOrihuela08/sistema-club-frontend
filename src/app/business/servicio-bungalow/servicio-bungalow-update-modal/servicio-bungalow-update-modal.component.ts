import { Component, Input, OnInit } from '@angular/core';
import { ClienteBungalow } from '../../../shared/models/ClienteBugalow';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { Bungalow } from '../../../shared/models/Bungalow';
import { ServicioBungalowService } from '../../../shared/services/servicio-bungalow.service';
import { ModalService } from '../../../shared/services/modal.service';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import { BungalowsService } from '../../../shared/services/bungalows.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicio-bungalow-update-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './servicio-bungalow-update-modal.component.html',
  styleUrl: './servicio-bungalow-update-modal.component.css'
})
export class ServicioBungalowUpdateModalComponent implements OnInit {

  @Input() servicioBungalow!: ClienteBungalow;
  serviciosBungalow: ClienteBungalow = new ClienteBungalow();
  servicioBungalowForm!: FormGroup;

  metodosPago: MetodoPago[] = [];
  bungalows: Bungalow[] = [];

  constructor(private servicioBungalowService: ServicioBungalowService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private metodoPagoService: MetodoPagoService,
    private bungalowService: BungalowsService
  ) { }


  ngOnInit(): void {
    this.servicioBungalowForm = this.fb.group({
      cliente: this.fb.group({
        name: [this.servicioBungalow.cliente.name],
        lastName: [this.servicioBungalow.cliente.lastName],
        district: [this.servicioBungalow.cliente.district],
        telephone: [this.servicioBungalow.cliente.telephone, Validators.required],
        dni: [this.servicioBungalow.cliente.dni]
      }),
      fechaInicio: [this.servicioBungalow.fechaInicio, Validators.required],
      fechaFin: [this.servicioBungalow.fechaFin, Validators.required],
      montoTotal: [this.servicioBungalow.montoTotal, Validators.required],
      metodoPago: this.fb.group({
        id: [this.servicioBungalow.metodoPago.id, Validators.required]
      }),
      bungalow: this.fb.group({
        id: [this.servicioBungalow.bungalow.id, Validators.required]
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

    //Para el calculo del monto total
    this.servicioBungalowForm.get('fechaInicio')?.valueChanges.subscribe(() => {
      this.calcularMontoTotal();
    });

    this.servicioBungalowForm.get('fechaFin')?.valueChanges.subscribe(() => {
      this.calcularMontoTotal();
    });

    this.servicioBungalowForm.get('bungalow.id')?.valueChanges.subscribe(() => {
      this.calcularMontoTotal();
    });
  }

  closeModalUpdateServicioBungalow(): void {
    this.modalService.$modalEditServicioBungalow.emit(false);
  }

  updateServicioBungalow(): void {
    if (this.servicioBungalowForm.invalid) {
      console.log('Formulario inválido');
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const servicioBungalowUpdate: ClienteBungalow = this.servicioBungalowForm.value;

    this.servicioBungalowService.updateServicioBungalow(this.servicioBungalow.id, servicioBungalowUpdate).subscribe({
      next: (response) => {
        console.log('Servicio de bungalow actualizado: ', response);
        this.servicioBungalowService.notifyServicioBungalowUpdate();
        Swal.fire({
          icon: 'success',
          title: 'Servicio de bungalow editado',
          text: 'El servicio de bungalow ha sido editado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.servicioBungalowService.notifyServicioBungalowUpdate();
        this.closeModalUpdateServicioBungalow();
      },
      error: (error) => {
        console.error('Error al actualizar el servicio de bungalow: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Error al editar el servicio de bungalow',
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

  //Esto es para obtener los bungalows
  getBungalows(): void {
    this.bungalowService.getBungalows().subscribe({
      next: (data) => {
        this.bungalows = data;
        console.log('Bungalows obtenidos: ', this.bungalows);
      },
      error: (err) => {
        console.error('Error al obtener los bungalows: ', err);
      }
    });
  }

  //Calculo del monto total
  calcularMontoTotal(): void {
    const fechaInicioRaw = this.servicioBungalowForm.value.fechaInicio;
  const fechaFinRaw = this.servicioBungalowForm.value.fechaFin;
  const bungalowId = this.servicioBungalowForm.value.bungalow?.id;

  if (!fechaInicioRaw || !fechaFinRaw || !bungalowId) {
    this.servicioBungalowForm.get('montoTotal')?.setValue(0, { emitEvent: false });
    return;
  }

  const inicio = new Date(fechaInicioRaw);
  const fin = new Date(fechaFinRaw);

  // Forzar ambas fechas a las 00:00:00
  inicio.setHours(0, 0, 0, 0);
  fin.setHours(0, 0, 0, 0);

  // Calcular diferencia de días
  const diffTime = fin.getTime() - inicio.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 1) {
    console.warn('Fechas inválidas. Monto total puesto en 0.');
    this.servicioBungalowForm.get('montoTotal')?.setValue(0, { emitEvent: false });
    return;
  }

  const bungalow = this.bungalows.find(b => b.id === +bungalowId);
  if (!bungalow) return;

  const monto = diffDays * bungalow.precio;
  this.servicioBungalowForm.get('montoTotal')?.setValue(monto, { emitEvent: false });

  console.log(`Días calculados: ${diffDays}`);
  console.log(`Precio del bungalow: ${bungalow.precio}`);
  console.log(`Monto total: ${monto}`);
  }
}
