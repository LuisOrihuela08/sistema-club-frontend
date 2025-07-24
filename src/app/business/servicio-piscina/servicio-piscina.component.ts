import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientePiscina } from '../../shared/models/ClientePiscina';
import { ServicioPiscinaService } from '../../shared/services/servicio-piscina.service';

@Component({
  selector: 'app-servicio-piscina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicio-piscina.component.html',
  styleUrl: './servicio-piscina.component.css'
})
export class ServicioPiscinaComponent implements OnInit {

  serviciosPiscina: ClientePiscina[] = [];

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

    //Esto es para limpiar los filtros
  cleanFilters(): void {
    this.getServicioPiscinaByPagination();
  }

}
