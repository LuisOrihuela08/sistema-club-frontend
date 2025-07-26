import { Cliente } from "./Cliente";
import { Hospedaje } from "./Hospedaje";
import { MetodoPago } from "./MetodoPago";

export class ClienteHospedaje {
  id: number = 0;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  montoTotal: number = 0;
  cliente: Cliente = new Cliente();
  hospedaje: Hospedaje = new Hospedaje();
  metodoPago: MetodoPago = new MetodoPago();
}
