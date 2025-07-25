import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClienteBungalow } from '../../shared/models/ClienteBugalow';
import { ServicioBungalowService } from '../../shared/services/servicio-bungalow.service';

@Component({
  selector: 'app-servicio-bungalow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicio-bungalow.component.html',
  styleUrl: './servicio-bungalow.component.css'
})
export class ServicioBungalowComponent implements OnInit {


  serviciosBungalow: ClienteBungalow[] = [];

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  constructor(private servicioBungalowService: ServicioBungalowService){}


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


  //Esto es para limpiar los filtros
  cleanFilters(): void {

  }
}
