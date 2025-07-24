import { Component, OnInit } from '@angular/core';
import { Hospedaje } from '../../shared/models/Hospedaje';
import { HospedajesService } from '../../shared/services/hospedajes.service';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HospedajeAddModalComponent } from './hospedaje-add-modal/hospedaje-add-modal.component';
import { Subscription } from 'rxjs';
import { HospedajeUpdateModalComponent } from './hospedaje-update-modal/hospedaje-update-modal.component';

@Component({
  selector: 'app-hospedajes',
  standalone: true,
  imports: [CommonModule, FormsModule, HospedajeAddModalComponent, HospedajeUpdateModalComponent],
  templateUrl: './hospedajes.component.html',
  styleUrl: './hospedajes.component.css'
})
export class HospedajesComponent implements OnInit {

  hospedajes: Hospedaje [] = [];
  codigoHabitacionBuscado: string = ''; // Para buscar hospedajes por código de habitación
  disponibilidadSeleccionada: boolean | null = null; // Para filtrar por disponibilidad

  //Sección de paginación
  currentPage: number = 0;
  pageSize: number = 14;
  totalPages: number = 1;

  //Seccion de modales
  isModalAddHospedajeVisible: boolean = false;
  isModalUpdateHospedajeVisible: boolean = false;
  hospedajeSelect: Hospedaje | null = null; // Para almacenar el hospedaje seleccionado para actualizar

  //Seccion para la subscripcion y actualización de hospedajes
  private hospedajeSubscribe: Subscription = undefined!; // Para actualizar los hospedajes en tiempo real

  constructor(private hospedajeService: HospedajesService,
              private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.getHospedajesByPagination();
    this.modalService.$modalAgregarHospedaje.subscribe((valor) => {this.isModalAddHospedajeVisible =valor});
    this.modalService.$modalEditarHospedaje.subscribe((valor) => {this.isModalUpdateHospedajeVisible =valor});
    this.hospedajeSubscribe = this.hospedajeService.hospedajeUpdate$.subscribe(
      () => {
        this.getHospedajesByPagination();
        console.log('Hospedajes actualizados en tiempo real');
      }
    )
  }

  openModalAddHospedaje(): void{
    this.modalService.$modalAgregarHospedaje.emit(true);
    console.log('Modal de agregar hospedaje abierto', this.isModalAddHospedajeVisible);
  }

  openModalUpdateHospedaje(hospedaje: Hospedaje): void {
    this.hospedajeSelect = hospedaje; // Le paso el hospedaje seleccionado
    this.modalService.$modalEditarHospedaje.emit(true);
  }

  //Método para listar los hospedajes con paginación
  getHospedajesByPagination(): void {
    this.hospedajeService.getHospedajeByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.hospedajes = data.content;
        this.totalPages = data.totalPages;
        console.log('Hospedajes obtenidos: ', this.hospedajes);
      },
      (error) => {
        console.log('Error al obtener los hospedajes: ', error);
      }
    );
  }

      nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getHospedajesByPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getHospedajesByPagination();
    }
  }

  cleanFilters(): void {
    this.currentPage = 0;
    this.getHospedajesByPagination();
  }

  //Filtrar una habitación por código
  getHospedajeByCodigoHabitacion(): void {
    if (!this.codigoHabitacionBuscado.trim()) {
      console.warn('El código de habitación no puede estar vacío');
      this.getHospedajesByPagination();
      return;
    }

    this.hospedajeService.getHospedajeByCodigo(this.codigoHabitacionBuscado).subscribe({
      next: (data) =>{
        this.hospedajes = [data];
        console.log('Hospedaje encontrado: ', data);
      },
      error: (error) => {
        console.error('Error al buscar el hospedaje por código: ', error);
        this.hospedajes = [];
      }
    });
  }

  //Filtrar hospedajes por disponibilidad
  getHospedajeByDisponibility(disponibles: boolean): void {
    this.disponibilidadSeleccionada = disponibles;
    this.hospedajeService.getHospedajeByDisponibilidad(this.currentPage, this.pageSize, disponibles).subscribe({
      next: (data) => {
        this.hospedajes = data.content;
        this.totalPages = data.totalPages;
        console.log('Hospedajes disponibles: ', this.hospedajes);
      },
      error: (error) => {
        console.error('Error al buscar los hospedajes por su disponibilidad: ', error);
        this.hospedajes = [];
      }
    });
  }
}
