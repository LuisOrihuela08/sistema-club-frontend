import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteHospedaje } from '../../shared/models/ClienteHospedaje';
import { ServicioHospedajeService } from '../../shared/services/servicio-hospedaje.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { ServicioHospedajeAddModalComponent } from './servicio-hospedaje-add-modal/servicio-hospedaje-add-modal.component';

@Component({
  selector: 'app-servicio-hospedaje',
  standalone: true,
  imports: [CommonModule, FormsModule, ServicioHospedajeAddModalComponent],
  templateUrl: './servicio-hospedaje.component.html',
  styleUrl: './servicio-hospedaje.component.css'
})
export class ServicioHospedajeComponent implements OnInit {

  serviciosHospedaje: ClienteHospedaje[] = [];
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

  //Seccion para los modales
  isModalAddServicioHospedajeVisible: boolean = false;
  isModalEditServicioHospedajeVisible: boolean = false;
  servicioHospedajeSelect: ClienteHospedaje | null = null;

  //Para la subscripcion
  private servicioHospedajeSubscribe: Subscription = undefined!;

  constructor(private servicioHospedajeService: ServicioHospedajeService,
              private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getServicioHospedajeByPagination();
    this.modalService.$modalAddServicioHospedaje.subscribe((valor) => {this.isModalAddServicioHospedajeVisible = valor});
    this.servicioHospedajeSubscribe = this.servicioHospedajeService.servicioHospedajeUpdate$.subscribe(
      () => {
        this.getServicioHospedajeByPagination();
        console.log('Servicio de hospedaje actualizado');
      }
    )
  }

  //Para abrir el modal de agregar servicio de hospedaje
  openModalAddServicioHospedaje(): void {
    this.modalService.$modalAddServicioHospedaje.emit(true);
  }


  getServicioHospedajeByPagination(): void {
    this.servicioHospedajeService.getServicioHospedajeByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.serviciosHospedaje = data.content;
        this.totalPages = data.totalPages;
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
    if (!this.desde || !this.hasta) {
      console.warn('Ambas fechas deben ser seleccionadas para filtrar');
      this.getServicioHospedajeByPagination();
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

    this.servicioHospedajeService.getServicioHospedajeByFechaBetween(this.currentPage, this.pageSize, desdeSeleccionada, hastaSeleccionada).subscribe(
      (data: any) => {
        this.filtroActual = 'RANGO';
        this.serviciosHospedaje = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de hospedaje obtenidos entre fechas: ', this.serviciosHospedaje);
      },
      (error) => {
        console.error('Error al obtener los servicios de hospedaje entre fechas: ', error);
        this.serviciosHospedaje = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioHospedajeByMetodoPagoAndFechaBetween(): void {
    if (!this.desdeMetodo || !this.hastaMetodo || !this.metodoPagoSeleccionado) {
      console.warn('No se han seleccionado todos los filtros necesarios');
      this.getServicioHospedajeByPagination();
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

    this.servicioHospedajeService.getServicioHospedajeByMetodoPagoAndFechaBetween(this.currentPage, this.pageSize, this.metodoPagoSeleccionado, desdeSeleccionada, hastaSeleccionada).subscribe(
      (data: any) => {
        this.filtroActual = 'METODO_Y_FECHAS';
        this.serviciosHospedaje = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de hospedaje obtenidos por método de pago y fechas: ', this.serviciosHospedaje);
      },
      (error) => {
        console.error('Error al obtener los servicios de hospedaje por método de pago y fechas: ', error);
        this.serviciosHospedaje = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioHospedajeByClienteDni(): void {
    if (!this.dniSeleccionado) {
      console.warn('No se ha ingresado un DNI');
      this.getServicioHospedajeByPagination();
      return;
    }
    this.servicioHospedajeService.getServicioHospedajeByClienteDni(this.currentPage, this.pageSize, this.dniSeleccionado).subscribe(
      (data: any) => {
        this.filtroActual = 'DNI';
        this.serviciosHospedaje = data.content;
        this.totalPages = data.totalPages;
        console.log('Servicios de hospedaje filtrados por DNI: ', this.serviciosHospedaje);
      },
      (error) => {
        console.error('Error al obtener los servicios de hospedaje filtrados por DNI: ', error);
        this.serviciosHospedaje = [];
        this.totalPages = 0;
      }
    );
  }

  getServicioHospedajePdfByFilters(): void {

    switch (this.filtroActual) {
      case 'FECHA':
        const fechaSeleccionada = new Date(this.fechaInicio!);
        this.servicioHospedajeService.exportPdfByFilters(undefined, undefined, fechaSeleccionada).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por fecha Ok ', fechaSeleccionada);
        break;

      case 'RANGO':
        const desdeSeleccionada = new Date(this.desde!);
        const hastaSeleccionada = new Date(this.hasta!);
        this.servicioHospedajeService.exportPdfByFilters(undefined, undefined, undefined, desdeSeleccionada, hastaSeleccionada).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por rango de fechas Ok ', desdeSeleccionada, hastaSeleccionada);
        break;

      case 'METODO_Y_FECHAS':
        const desdeSeleccionada2 = new Date(this.desdeMetodo!);
        const hastaSeleccionada2 = new Date(this.hastaMetodo!);
        this.servicioHospedajeService.exportPdfByFilters(undefined, this.metodoPagoSeleccionado, undefined, desdeSeleccionada2, hastaSeleccionada2).subscribe(this.descargarPdf, this.handleError);
        console.log('Exportando PDF por método de pago y rango de fechas Ok ', this.metodoPagoSeleccionado, desdeSeleccionada2, hastaSeleccionada2);
        break;

      case 'DNI':
        this.servicioHospedajeService.exportPdfByFilters(this.dniSeleccionado).subscribe(this.descargarPdf, this.handleError);
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

  exportPdfById(id: number): void {
    this.servicioHospedajeService.exportPdfById(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva pestaña
        setTimeout(() => window.URL.revokeObjectURL(url), 5000);
      },
      (error) => {
        console.error('Error al exportar PDF por ID:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar el reporte por ID.',
          confirmButtonText: 'Aceptar'
        });
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
    this.getServicioHospedajeByPagination();
  }
}
