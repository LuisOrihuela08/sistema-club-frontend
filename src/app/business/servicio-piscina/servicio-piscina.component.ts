import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientePiscina } from '../../shared/models/ClientePiscina';
import { ServicioPiscinaService } from '../../shared/services/servicio-piscina.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicio-piscina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-piscina.component.html',
  styleUrl: './servicio-piscina.component.css'
})
export class ServicioPiscinaComponent implements OnInit {

  serviciosPiscina: ClientePiscina[] = [];
  fechaInicio: Date | null = null; // Para filtrar por fecha
  desde: Date | null = null; // Para filtrar por fecha desde
  hasta: Date | null = null; // Para filtrar por fecha hasta
  desdeMetodo: Date | null = null; // Para filtrar por fecha desde método de pago
  hastaMetodo: Date | null = null; // Para filtrar por fecha hasta método de pago
  dniSeleccionado: string = ''; // Para filtrar por DNI del cliente
  metodoPagoSeleccionado: string = ''; // Para filtrar por método de pago
  filtroActual: 'FECHA' | 'RANGO' | 'METODO_Y_FECHAS' | 'DNI' | null = null; // Para saber qué filtro se está aplicando

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  constructor(private servicioPiscinaService: ServicioPiscinaService) { }

  ngOnInit(): void {
    this.getServicioPiscinaByPagination();
  }

  getServicioPiscinaByPagination(): void {
    this.servicioPiscinaService.getServicioPiscinaByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.serviciosPiscina = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de piscina obtenidos: ', this.serviciosPiscina);
      },
      (error) => {
        console.error('Error al obtener los servicios de piscina: ', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getServicioPiscinaByPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getServicioPiscinaByPagination();
    }
  }

  //Filtro por fecha
  getServicioPiscinaByFecha(): void {

    if (!this.fechaInicio) {
      console.warn('No se ha seleccionado una fecha para filtrar');
      this.getServicioPiscinaByPagination();
      Swal.fire({
        icon: 'warning',
        title: 'Fecha no seleccionada',
        text: 'Por favor, seleccione una fecha para realizar la búsqueda.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const fechaSeleccionada = new Date(this.fechaInicio);

    this.servicioPiscinaService.getServicioPiscinaByFechaPagination(this.currentPage, this.pageSize, fechaSeleccionada).subscribe(
      (data: any) => {
        this.filtroActual = 'FECHA'; // Actualiza el filtro actual
        this.serviciosPiscina = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de piscina filtrados por fecha: ', data.content);
      },
      (error) => {
        console.error('Error al obtener los servicios de piscina filtrados por fecha: ', error);

        this.serviciosPiscina = [];
        this.totalPages = 0;
      }
    )
  }

  getServicioPiscinaByFechaBetween(): void {
    if (!this.desde || !this.hasta) {
      console.warn('No se han seleccionado ambas fechas para filtrar');
      this.getServicioPiscinaByPagination();
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

    this.servicioPiscinaService.getServicioPiscinaByFechaBetween(this.currentPage, this.pageSize, desdeSeleccionada, hastaSeleccionada).subscribe(
      (data: any) => {
        this.filtroActual = 'RANGO';
        this.serviciosPiscina = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de piscina filtrados por fechas: ', data.content);
      },
      (error) => {
        console.error('Error al obtener los servicios de piscina filtrados por fechas: ', error);
        this.serviciosPiscina = [];
        this.totalPages = 0;
      }
    )
  }

  getServicioPiscinaByClienteDni(): void {
    if (!this.dniSeleccionado) {
      console.warn('No se ha ingresado un DNI');
      this.getServicioPiscinaByPagination();
      return;
    }
    this.servicioPiscinaService.getServicioPiscinaByClienteDni(this.currentPage, this.pageSize, this.dniSeleccionado).subscribe(
      (data: any) => {
        this.filtroActual = 'DNI';
        this.serviciosPiscina = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de piscina filtrados por DNI: ', this.serviciosPiscina);
      },
      (error) => {
        console.error('Error al obtener los servicios de piscina filtrados por DNI: ', error);
        this.serviciosPiscina = [];
        this.totalPages = 0;
      }
    )
  }

  getServicioPiscinaByMetodoPagoAndFechaBetween(): void {
    if (!this.desdeMetodo || !this.hastaMetodo || !this.metodoPagoSeleccionado) {
      console.warn('No se han seleccionado todos los filtros necesarios');
      this.getServicioPiscinaByPagination();
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

    this.servicioPiscinaService.getServicioPiscinaByMetodoPagoAndFechaBetween(this.currentPage, this.pageSize, this.metodoPagoSeleccionado, desdeSeleccionada, hastaSeleccionada).subscribe(
      (data: any) => {
        this.filtroActual = 'METODO_Y_FECHAS';
        this.serviciosPiscina = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de piscina filtrados por método de pago y fechas: ', data.content);
      },
      (error) => {
        console.error('Error al obtener los servicios de piscina filtrados por método de pago y fechas: ', error);
        this.serviciosPiscina = [];
        this.totalPages = 0;
      }
    )
  }

  getServicioPiscinaPdfByFilters(): void {

    switch (this.filtroActual) {
      case 'FECHA':
        const fechaSeleccionada = new Date(this.fechaInicio!);
        this.servicioPiscinaService.exportPdfServicioPiscina(undefined, undefined, fechaSeleccionada).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por fecha Ok ', fechaSeleccionada);
        break;

      case 'RANGO':
        const desdeSeleccionada = new Date(this.desde!);
        const hastaSeleccionada = new Date(this.hasta!);
        this.servicioPiscinaService.exportPdfServicioPiscina(undefined, undefined, undefined, desdeSeleccionada, hastaSeleccionada).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por rango de fechas Ok ', desdeSeleccionada, hastaSeleccionada);
        break;

      case 'METODO_Y_FECHAS':
        const desdeSeleccionada2 = new Date(this.desdeMetodo!);
        const hastaSeleccionada2 = new Date(this.hastaMetodo!);
        this.servicioPiscinaService.exportPdfServicioPiscina(undefined, this.metodoPagoSeleccionado, undefined, desdeSeleccionada2, hastaSeleccionada2).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por método de pago y rango de fechas Ok ', this.metodoPagoSeleccionado, desdeSeleccionada2, hastaSeleccionada2);
        break;

      case 'DNI':
        this.servicioPiscinaService.exportPdfServicioPiscina(this.dniSeleccionado).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por DNI Ok ', this.dniSeleccionado);
        break;

      default:
        Swal.fire({
          icon: 'warning',
          title: 'Filtros no seleccionados',
          text: 'Por favor, aplique un filtro antes de generar el reporte.',
          confirmButtonText: 'Aceptar'
        });
    }
  }

  descargarPdf = (response: Blob) => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Abre el PDF en una nueva pestaña
    setTimeout(() => window.URL.revokeObjectURL(url), 5000);
  };

  handleError = (error: any) => {
    console.error('Error al exportar PDF:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo generar el reporte.',
      confirmButtonText: 'Aceptar'
    });
  };



  //Esto es para limpiar los filtros
  cleanFilters(): void {
    this.fechaInicio = null;
    this.desde = null;
    this.hasta = null;
    this.desdeMetodo = null;
    this.hastaMetodo = null;
    this.dniSeleccionado = '';
    this.metodoPagoSeleccionado = '';
    this.getServicioPiscinaByPagination();
  }

}
