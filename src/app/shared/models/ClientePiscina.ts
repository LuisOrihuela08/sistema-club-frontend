import { Cliente } from "./Cliente";
import { MetodoPago } from "./MetodoPago";

export class ClientePiscina {
  id: number = 0;
  precioUnitario: number = 0;
  cantidadPersonas: number = 0;
  montoTotal: number = 0;
  fecha: Date = new Date();
  cliente: Cliente = new Cliente();
  metodoPago: MetodoPago = new MetodoPago();
}
