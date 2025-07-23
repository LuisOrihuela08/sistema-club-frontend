import { Component, OnInit } from '@angular/core';
import { MetodoPagoService } from '../../shared/services/metodo-pago.service';
import { MetodoPago } from '../../shared/models/MetodoPago';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metodos-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metodos-pago.component.html',
  styleUrl: './metodos-pago.component.css'
})
export class MetodosPagoComponent implements OnInit {

  metodosPago: MetodoPago [] = [];
  nameMetodoPagoBuscado: string = ''; //Esto es para realizar la busqueda del metodo de pago por nombre
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

}
