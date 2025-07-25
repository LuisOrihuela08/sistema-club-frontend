import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClienteBungalow } from '../../shared/models/ClienteBugalow';
import { ServicioBungalowService } from '../../shared/services/servicio-bungalow.service';
import Swal from 'sweetalert2';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-servicio-bungalow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-bungalow.component.html',
  styleUrl: './servicio-bungalow.component.css'
})
export class ServicioBungalowComponent implements OnInit {


  serviciosBungalow: ClienteBungalow[] = [];
  fechaInicio: Date | null = null; // Para filtrar por fecha
  desde: Date | null = null; // Para filtrar por fecha desde
  hasta: Date | null = null; // Para filtrar por fecha hasta
  desdeMetodo: Date | null = null; // Para filtrar por fecha desde método de pago
  hastaMetodo: Date | null = null; // Para filtrar por fecha hasta método de pago
  metodoPagoSeleccionado: string = ''; // Para filtrar por método de pago
  dniSeleccionado: string = ''; // Para filtrar por DNI del cliente

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  constructor(private servicioBungalowService: ServicioBungalowService) { }


  ngOnInit(): void {
    this.getServicioBungalowByPagination();
  }

  getServicioBungalowByPagination(): void {
    this.servicioBungalowService.getServicioBungalowByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.serviciosBungalow = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de bungalows obtenido: ', this.serviciosBungalow);
      },
      (error) => {
        console.error('Error al obtener los servicios de bungalows: ', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getServicioBungalowByPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getServicioBungalowByPagination();
    }
  }

  //Filtro por fecha de inicio
  getServicioBungalowByFecha(): void {
    if (!this.fechaInicio) {
      console.warn('Fecha de inicio no puede ser nula');
      this.getServicioBungalowByPagination();
      Swal.fire({
        icon: 'warning',
        title: 'Fecha no seleccionada',
        text: 'Por favor, seleccione una fecha para realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const fechaSeleccionada = new Date(this.fechaInicio);

    this.servicioBungalowService.getServicioBungalowByFechaPagination(this.currentPage, this.pageSize, fechaSeleccionada).subscribe(
      (data: any) => {
        this.serviciosBungalow = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de bungalows obtenidos por fecha: ', this.serviciosBungalow);
      },
      (error) => {
        console.error('Error al obtener los servicios de bungalows por fecha: ', error);
        this.serviciosBungalow = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioBungalowByFechaBetween(): void {
    if (!this.desde || !this.hasta) {
      console.warn('Ambas fechas deben ser seleccionadas para filtrar');
      this.getServicioBungalowByPagination();
      Swal.fire({
        icon: 'warning',
        title: 'Fechas no seleccionada',
        text: 'Por favor, seleccione ambas fechas para realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const desdeSeleccionada = new Date(this.desde);
    const hastaSeleccionada = new Date(this.hasta);

    this.servicioBungalowService.getServicioBungalowByFechaBetween(this.currentPage, this.pageSize, desdeSeleccionada, hastaSeleccionada).subscribe(
      (data: any) => {
        this.serviciosBungalow = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de bungalows obtenidos entre fechas: ', this.serviciosBungalow);
      },
      (error) => {
        console.error('Error al obtener los servicios de bungalows entre fechas: ', error);
        this.serviciosBungalow = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioBungalowByMetodoPagoAndFechaBetween(): void {
    if (!this.desdeMetodo || !this.hastaMetodo || !this.metodoPagoSeleccionado) {
      console.warn('No se han seleccionado todos los filtros necesarios');
      this.getServicioBungalowByPagination();
      Swal.fire({
        icon: 'warning',
        title: 'Filtros incompletos',
        text: 'Por favor, seleccione un método de pago y ambas fechas para realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const desdeSeleccionada = new Date(this.desdeMetodo);
    const hastaSeleccionada = new Date(this.hastaMetodo);

    this.servicioBungalowService.getServicioBungalowByMetodoPagoAndFechaBetween(this.currentPage, this.pageSize, this.metodoPagoSeleccionado, desdeSeleccionada, hastaSeleccionada).subscribe(
      (data: any) => {
        console.log(this.metodoPagoSeleccionado);
        this.serviciosBungalow = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de bungalows obtenidos por método de pago y fechas: ', this.serviciosBungalow);
      },
      (error) => {
        console.error('Error al obtener los servicios de bungalows por método de pago y fechas: ', error);
        this.serviciosBungalow = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioBungalowByClienteDni(): void {
    if (!this.dniSeleccionado) {
      console.warn('No se ha ingresado un DNI');
      this.getServicioBungalowByPagination();
      return;
    }
    this.servicioBungalowService.getServicioBungalowByClienteDni(this.currentPage, this.pageSize, this.dniSeleccionado).subscribe(
      (data: any) => {
        this.serviciosBungalow = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de bungalows filtrados por DNI: ', this.serviciosBungalow);
      },
      (error) => {
        console.error('Error al obtener los servicios de bungalows filtrados por DNI: ', error);
        this.serviciosBungalow =[];
        this.totalPages = 0;
      }
    );
  }


  //Esto es para limpiar los filtros
  cleanFilters(): void {
    this.fechaInicio = null;
    this.desde = null;
    this.hasta = null;
    this.desdeMetodo = null;
    this.hastaMetodo = null;
    this.metodoPagoSeleccionado = '';
    this.dniSeleccionado = '';
    this.getServicioBungalowByPagination();
  }
}
