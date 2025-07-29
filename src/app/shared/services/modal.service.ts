import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  //Esto es para el servicio de hospedaje
  $modalAddServicioHospedaje = new EventEmitter<any>();
  $modalEditServicioHospedaje  = new EventEmitter<any>();

  //Esto es para el servicio de bungalow
  $modalAddServicioBungalow = new EventEmitter<any>();
  $modalEditServicioBungalow  = new EventEmitter<any>();

  //Esto es para el servicio de piscina
  $modalAddServicioPiscina = new EventEmitter<any>();
  $modalEditServicioPiscina  = new EventEmitter<any>();

  //Esto es para método de pago
  $modalAgregarHospedaje = new EventEmitter<any>();
  $modalEditarHospedaje  = new EventEmitter<any>();

  //Esto es para método de pago
  $modalAgregarBungalow = new EventEmitter<any>();
  $modalEditarBungalow  = new EventEmitter<any>();

  //Esto es para método de pago
  $modalAgregarMetodoPago = new EventEmitter<any>();
  $modalEditarMetodoPago = new EventEmitter<any>();

  //Esto es para cliente
  $modalEditarCliente = new EventEmitter<any>();
}
