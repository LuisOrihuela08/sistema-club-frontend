import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetodoPagoService } from '../../shared/services/metodo-pago.service';
import { MetodoPago } from '../../shared/models/MetodoPago';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { MetodopagoAddModalComponent } from './metodopago-add-modal/metodopago-add-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metodos-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, MetodopagoAddModalComponent],
  templateUrl: './metodos-pago.component.html',
  styleUrl: './metodos-pago.component.css'
})
export class MetodosPagoComponent implements OnInit, OnDestroy {

  metodosPago: MetodoPago [] = [];
  nameMetodoPagoBuscado: string = ''; //Esto es para realizar la busqueda del metodo de pago por nombre
  //Seccion modales
  isModalAddMetodoPagoVisible: boolean = false;
  isModalUpdateMetodoPagoVisible: boolean = false;
  metodoPagoSelect: MetodoPago | null = null;//Variable para almacenar el método de pago seleccionado para poder actualizar
  //Seccion de subscripcion y actualizacion de métodos de pago
  private metodoPagoSusbcribe: Subscription = undefined!;//Esto es para actualizar los métodos de pago en tiempo real

  constructor(private metodoPagoService: MetodoPagoService,
              private modalService: ModalService
  ){

  }
  ngOnDestroy(): void {
    //Aca me aseguro de cerrar la subscripción al servicio
    if (this.metodoPagoSusbcribe) {
      this.metodoPagoSusbcribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getMetodosPago();
    this.modalService.$modalAgregarMetodoPago.subscribe((valor) => {this.isModalAddMetodoPagoVisible = valor});
    this.metodoPagoSusbcribe = this.metodoPagoService.metodoPagoUpdate$.subscribe(
      () => {
        this.getMetodosPago();
        console.log('Métodos de pago actualizados en tiempo real');
      }
    )
  }

  //Esto es para abrir el modal de agregar método de pago
  openModalAddMetodoPago(){
    this.modalService.$modalAgregarMetodoPago.emit(true);
    console.log('Modal para agregar un método de pago abierto');
  }

  //Método para listar los métodos de pago
  getMetodosPago(): void {
    this.metodoPagoService.getMetodosPago().subscribe({
      next: (data) => {
        this.metodosPago = data;
        console.log('Método de pago obtenidos: ', this.metodosPago);
      },
      error: (err) => {
        console.error('Error al obtener métodos de pago: ', err);
      }
    });
  }

  //Método para buscar método de pago por nombre (name)
  getMetodoPagoByName(): void {

    if (!this.nameMetodoPagoBuscado.trim()) {
      console.warn('El campo de búsqueda está vacío. Por favor, ingrese un nombre.');
      this.getMetodosPago(); // Si el campo está vacío, recargar todos los métodos de pago
      return;
    }

    this.metodoPagoService.getMetodoPagoByName(this.nameMetodoPagoBuscado).subscribe({
      next: (data) => {
        this.metodosPago = [data];// Asignar el resultado a la lista de métodos de pago
        console.log('Método de pago encontrado: ', this.metodosPago);
      },
      error: (err) => {
        console.error('Error al buscar el método de pago por nombre: ', err);
        this.metodosPago = [];
      }
    });
  }

  //Método para eliminar un método de pago
  deleteMetododPago(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este método de pago?',
      text: 'No habra manera de revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.metodoPagoService.deleteMetodoPago(id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Método de Pago eliminado',
              text: 'El Método de Pago ha sido eliminado exitosamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            console.log('Método de pago eliminado exitosamente: ', response);

            //Notificamos al servicio para actualizar el listado de métodos de pago
            this.metodosPago = this.metodosPago.filter(metodo => metodo.id !== id);// Actualizar la lista de métodos de pago en el componente
            this.metodoPagoService.notifyMetodoPagoUpdate();
          },
          (error) => {
            console.log('Error al eliminar el método de pago: ', error);
            Swal.fire({
              title: 'Error al eliminar el método de pago',
              text: 'No se pudo eliminar el método de pago.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        )
      }
    })
  }

}
