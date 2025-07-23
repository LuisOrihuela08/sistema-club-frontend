import { Component, Input, OnInit } from '@angular/core';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import { ModalService } from '../../../shared/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metodopago-update-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './metodopago-update-modal.component.html',
  styleUrl: './metodopago-update-modal.component.css'
})
export class MetodopagoUpdateModalComponent implements OnInit{

  @Input() metodoPago!: MetodoPago;//Recibe el objeto MetodoPago desde el componente padre
  metodosPago: MetodoPago = new MetodoPago();
  metodoPagoForm!: FormGroup;

  constructor(private metodoPagoService: MetodoPagoService,
              private modalService: ModalService,
              private fb: FormBuilder
  ){}
  ngOnInit(): void {
    //Inicialiazamos el formulario con los campos del objeto MetodoPago
    this.metodoPagoForm = this.fb.group({
      id: [this.metodoPago.id],
      name: [this.metodoPago.name]
    });

    //Aca verifico los valores a editar
    console.log(this.metodoPagoForm.value);
    this.metodoPagoForm.valueChanges.subscribe((value) => {
      console.log('Valores actuales del formulario: ', value);
    });
  }


  //Método para cerrar el modal
  closeModalUpdateMetodoPago(){
    this.modalService.$modalEditarMetodoPago.emit(false);
  }

  //Método para actualizar el método de pago
  updateMetodoPago(){

    if (this.metodoPagoForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const metodoPagoUpdate: MetodoPago = this.metodoPagoForm.value;

    this.metodoPagoService.updateMetodoPago(this.metodoPago.id, metodoPagoUpdate).subscribe({
      next: (response) => {
        console.log('Método de pago actualizado: ', response);
        this.metodoPagoService.notifyMetodoPagoUpdate();//Notificamos para actualizar la lista de métodos de pago

        Swal.fire({
          icon: 'success',
          title: 'Método de Pago editado',
          text: 'El método de pago ha sido editado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.closeModalUpdateMetodoPago();//Cerramos el modal
      },
      error: (error) => {
        console.error('Error al actualizar el método de pago: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Error al editar el método de pago',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
