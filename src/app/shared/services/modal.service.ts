import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  //Esto es para método de pago
  $modalAgregarBungalow = new EventEmitter<any>();
  $modalEditarBungalow  = new EventEmitter<any>();

  //Esto es para método de pago
  $modalAgregarMetodoPago = new EventEmitter<any>();
  $modalEditarMetodoPago = new EventEmitter<any>();

  //Esto es para cliente
  $modalEditarCliente = new EventEmitter<any>();
}
