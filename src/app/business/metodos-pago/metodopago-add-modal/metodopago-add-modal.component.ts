import { Component, OnInit } from '@angular/core';
import { MetodoPago } from '../../../shared/models/MetodoPago';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../shared/services/modal.service';
import { MetodoPagoService } from '../../../shared/services/metodo-pago.service';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-metodopago-add-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './metodopago-add-modal.component.html',
  styleUrl: './metodopago-add-modal.component.css'
})
export class MetodopagoAddModalComponent implements OnInit{

  metodoPago: MetodoPago = new MetodoPago();
  metodoPagoForm!: FormGroup;

  constructor(private modalService: ModalService,
              private metodoPagoService: MetodoPagoService,
              private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.metodoPagoForm = this.fb.group({
      name: ['', Validators.required]
    });

    //Esto es para ver lo que se va agregando
    console.log(this.metodoPagoForm.value);
    this.metodoPagoForm.valueChanges.subscribe((value) => {
      console.log('Valores agregados: ', value);
    });
  }

  //Método para cerrar el modal
  closeModalAddMetodoPago(){
    this.modalService.$modalAgregarMetodoPago.emit(false);
  }

  //Método para agregar un nuevo método de pago
  addMetodoPago(): void {

    // Verificar si hay campos vacíos
    if (this.metodoPagoForm.invalid) {
      console.log('Formulario inválido:', this.metodoPagoForm.invalid);
      Swal.fire({
              icon: "warning",
              title: "Formulario incompleto",
              text: "Por favor, completa todos los campos antes de continuar.",
              confirmButtonText: "Aceptar"
            });
      return;
    }

    // Obtener los valores del formulario
    const nuevoMetodoPago = this.metodoPagoForm.value;

    //Llamamos al servicio para crear el nuevo método de pago
    this.metodoPagoService.createMetodoPago(nuevoMetodoPago).subscribe({
      next: (response) => {
        console.log('Método de pago agregado: ', response);
        Swal.fire({
          icon: "success",
          title: "Método de pago agregado",
          text: "El método de pago se ha agregado exitosamente.",
          confirmButtonText: "Aceptar"
        });
        //Aca notificamos al servicio para que actualice el listado de los metodos
        this.metodoPagoService.notifyMetodoPagoUpdate();

        //Reseteamos el formulario luego de agregar el método de pago
        this.metodoPagoForm.reset();
        this.closeModalAddMetodoPago();//Cerramos el modal despues de agregar el método de pago
      },
      error: (error) => {
        console.error('Error al agregar el método  de pago: ', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el método de pago. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Aceptar"
        })
      }
    });
  }

}
