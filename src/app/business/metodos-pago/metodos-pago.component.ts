import { Component, OnInit } from '@angular/core';
import { MetodoPagoService } from '../../shared/services/metodo-pago.service';
import { MetodoPago } from '../../shared/models/MetodoPago';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metodos-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metodos-pago.component.html',
  styleUrl: './metodos-pago.component.css'
})
export class MetodosPagoComponent implements OnInit {

  metodosPago: MetodoPago [] = [];

  constructor(private metodoPagoService: MetodoPagoService){

  }

  ngOnInit(): void {
    this.getMetodosPago();
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

}
