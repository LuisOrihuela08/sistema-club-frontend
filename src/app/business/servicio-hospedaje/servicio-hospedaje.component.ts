import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteHospedaje } from '../../shared/models/ClienteHospedaje';
import { ServicioHospedajeService } from '../../shared/services/servicio-hospedaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-hospedaje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-hospedaje.component.html',
  styleUrl: './servicio-hospedaje.component.css'
})
export class ServicioHospedajeComponent implements OnInit {

  serviciosHospedaje: ClienteHospedaje [] = [];
  fechaInicio: Date | null = null; // Para filtrar por fecha
  desde: Date | null = null; // Para filtrar por fecha desde
  hasta: Date | null = null; // Para filtrar por fecha hasta
  desdeMetodo: Date | null = null; // Para filtrar por fecha desde método de pago
  hastaMetodo: Date | null = null; // Para filtrar por fecha hasta método de pago
  metodoPagoSeleccionado: string = ''; // Para filtrar por método de pago
  dniSeleccionado: string = ''; // Para filtrar por DNI del cliente
  filtroActual: 'FECHA' | 'RANGO' | 'METODO_Y_FECHAS' | 'DNI' | null = null;

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  constructor(private servicioHospedajeService: ServicioHospedajeService) { }

  ngOnInit(): void {
    this.getServicioHospedajeByPagination();
  }

  getServicioHospedajeByPagination(): void {
    this.servicioHospedajeService.getServicioHospedajeByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.serviciosHospedaje = data.content;
        this.totalPages =data.totalPages;
        console.log('Servicios de hospedaje obtenido: ', this.serviciosHospedaje);
      },
      (error) => {
        console.error('Error al obtener los servicios de hospedaje: ', error);
      }
    );
  }

    nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getServicioHospedajeByPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getServicioHospedajeByPagination();
    }
  }

    //Esto es para limpiar los filtros
  cleanFilters(): void {
    this.getServicioHospedajeByPagination();
  }

  getServicioHospedajeByFecha(): void {
    if (!this.fechaInicio) {
      console.warn('Fecha de inicio no puede ser nula');
      this.getServicioHospedajeByPagination();
      Swal.fire({
        icon: 'warning',
        title: 'Fecha no seleccionada',
        text: 'Por favor, seleccione una fecha para realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const fechaSeleccionada = new Date(this.fechaInicio);

    this.servicioHospedajeService.getServicioHospedajeByFechaPagination(this.currentPage, this.pageSize, fechaSeleccionada).subscribe(
      (data: any) => {
        this.filtroActual = 'FECHA';
        this.serviciosHospedaje = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de hospedaje obtenidos por fecha: ', this.serviciosHospedaje);
      },
      (error) => {
        console.error('Error al obtener los servicios de hospedaje por fecha: ', error);
        this.serviciosHospedaje = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioHospedajeByFechaBetween(): void {

  }

  getServicioHospedajeByMetodoPagoAndFechaBetween(): void {

  }

  getServicioHospedajeByClienteDni(): void {

  }

  getServicioHospedajePdfByFilters(): void {

  }

}
