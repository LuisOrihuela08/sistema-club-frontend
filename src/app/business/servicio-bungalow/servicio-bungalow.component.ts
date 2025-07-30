import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClienteBungalow } from '../../shared/models/ClienteBugalow';
import { ServicioBungalowService } from '../../shared/services/servicio-bungalow.service';
import Swal from 'sweetalert2';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { ServicioBungalowAddModalComponent } from './servicio-bungalow-add-modal/servicio-bungalow-add-modal.component';
import { Subscription } from 'rxjs';
import { ServicioBungalowUpdateModalComponent } from './servicio-bungalow-update-modal/servicio-bungalow-update-modal.component';

@Component({
  selector: 'app-servicio-bungalow',
  standalone: true,
  imports: [CommonModule, FormsModule, ServicioBungalowAddModalComponent, ServicioBungalowUpdateModalComponent],
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
  filtroActual: 'FECHA' | 'RANGO' | 'METODO_Y_FECHAS' | 'DNI' | null = null;

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  //Sección para los modales
  isModalAddServicioBungalowVisible: boolean = false; // Para mostrar/ocultar el modal de vista de servicio de bungalow
  isModalEditServicioBungalowVisible: boolean = false;
  servicioBungalowSelect: ClienteBungalow | null = null; // Para almacenar el servicio de bungalow seleccionado

  //Sección para subscripción y actualización de servicios de piscina
    private servicioBungalowSubscribe: Subscription = undefined!;

  constructor(private servicioBungalowService: ServicioBungalowService,
              private modalService: ModalService
  ) { }


  ngOnInit(): void {
    this.getServicioBungalowByPagination();
    this.modalService.$modalAddServicioBungalow.subscribe((valor) => {this.isModalAddServicioBungalowVisible = valor});
    this.modalService.$modalEditServicioBungalow.subscribe((valor) => {this.isModalEditServicioBungalowVisible = valor});
    this.servicioBungalowSubscribe = this.servicioBungalowService.servicioBungalowUpdate$.subscribe(
      () => {
        this.getServicioBungalowByPagination();
        console.log('Lista de servicios de bungalow actualizada');
      }
    )
  }

  //Para abrir el modal de agregar servicio de bungalow
  openModalAddServicioBungalow(): void {
    this.modalService.$modalAddServicioBungalow.emit(true);
  }

  //Para cerrar el modal de agregar servicio de bungalow
  openModalEditServicioBungalow(servicioBungalow: ClienteBungalow): void {
    this.servicioBungalowSelect = servicioBungalow;
    this.modalService.$modalEditServicioBungalow.emit(true);
    console.log('Servicio de bungalow seleccionado para edición: ', this.isModalEditServicioBungalowVisible);
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
        this.filtroActual = 'FECHA';
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
        this.filtroActual = 'RANGO';
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
        this.filtroActual = 'METODO_Y_FECHAS';
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
        this.filtroActual = 'DNI';
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

  getServicioBungalowPdfByFilters(): void {

      switch (this.filtroActual) {
        case 'FECHA':
          const fechaSeleccionada = new Date(this.fechaInicio!);
          this.servicioBungalowService.exportPdfByFilters(undefined, undefined, fechaSeleccionada).subscribe(this.descargarPdf, this.handleError);
          console.log('Exportando PDF por fecha Ok ', fechaSeleccionada);
          break;

        case 'RANGO':
          const desdeSeleccionada = new Date(this.desde!);
          const hastaSeleccionada = new Date(this.hasta!);
          this.servicioBungalowService.exportPdfByFilters(undefined, undefined, undefined, desdeSeleccionada, hastaSeleccionada).subscribe(this.descargarPdf, this.handleError);
          console.log('Exportando PDF por rango de fechas Ok ', desdeSeleccionada, hastaSeleccionada);
          break;

        case 'METODO_Y_FECHAS':
          const desdeSeleccionada2 = new Date(this.desdeMetodo!);
          const hastaSeleccionada2 = new Date(this.hastaMetodo!);
          this.servicioBungalowService.exportPdfByFilters(undefined, this.metodoPagoSeleccionado, undefined, desdeSeleccionada2, hastaSeleccionada2).subscribe(this.descargarPdf, this.handleError);
          console.log('Exportando PDF por método de pago y rango de fechas Ok ', this.metodoPagoSeleccionado, desdeSeleccionada2, hastaSeleccionada2);
          break;

        case 'DNI':
          this.servicioBungalowService.exportPdfByFilters(this.dniSeleccionado).subscribe(this.descargarPdf, this.handleError);
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
    this.servicioBungalowService.exportPdfById(id).subscribe(
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
    this.getServicioBungalowByPagination();
  }
}
