import { Bungalow } from "./Bungalow";
import { Cliente } from "./Cliente";
import { MetodoPago } from "./MetodoPago";

export class ClienteBungalow {
  id: number = 0;
  montoTotal: number = 0;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  cliente: Cliente = new Cliente();
  bungalow: Bungalow = new Bungalow();
  metodoPago: MetodoPago = new MetodoPago();
}
