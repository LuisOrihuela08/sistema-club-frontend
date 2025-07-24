import { Component, OnInit } from '@angular/core';
import { Hospedaje } from '../../shared/models/Hospedaje';
import { HospedajesService } from '../../shared/services/hospedajes.service';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospedajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private hospedajeService: HospedajesService,
              private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.getHospedajesByPagination();
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
}
