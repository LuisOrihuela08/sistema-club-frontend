import { Component, OnInit } from '@angular/core';
import { Hospedaje } from '../../shared/models/Hospedaje';
import { HospedajesService } from '../../shared/services/hospedajes.service';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospedajes',
  standalone: true,
  imports: [CommonModule],
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
}
