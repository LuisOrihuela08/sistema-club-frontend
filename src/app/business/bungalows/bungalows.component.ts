import { Component, OnInit } from '@angular/core';
import { Bungalow } from '../../shared/models/Bungalow';
import { Subscription } from 'rxjs';
import { BungalowsService } from '../../shared/services/bungalows.service';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BungalowAddModalComponent } from './bungalow-add-modal/bungalow-add-modal.component';

@Component({
  selector: 'app-bungalows',
  standalone: true,
  imports: [CommonModule, FormsModule, BungalowAddModalComponent],
  templateUrl: './bungalows.component.html',
  styleUrl: './bungalows.component.css'
})
export class BungalowsComponent implements OnInit {

  bungalows: Bungalow [] = [];
  codigoBungalowBuscado: string = ''; // Esto es para realizar la busqueda del bungalow por código
  disponibilidadSeleccionada: boolean | null = null;// Esto es para filtrar por disponibilidad, si es true o false

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  //Seccion de modal para actualizar bungalow
  isModalAddBungalowVisible: boolean = false;
  isModalUpdateBungalowVisible: boolean = false;
  bungalowSelect: Bungalow | null = null; // Variable para almacenar el bungalow seleccionado para poder actualizar

  //Sección para subscripción y actualización de bungalows
  private bungalowSubscribe: Subscription = undefined!; // Esto es para actualizar los bungalows en tiempo real

  constructor(private bungalowService: BungalowsService,
              private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.getBungalowsByPagination();
    this.modalService.$modalAgregarBungalow.subscribe((valor) => {this.isModalAddBungalowVisible = valor});
    this.bungalowSubscribe = this.bungalowService.bungalowUpdate$.subscribe(
      () => {
        this.getBungalowsByPagination();
        console.log('Bungalows actualizados en tiempo real');
      }
    )
  }

  //Método para abrir el modal de agregar bungalow
  openModalAddBungalow(): void {
    this.modalService.$modalAgregarBungalow.emit(true);
  }

  //Método para listar los bungalows con  paginación
  getBungalowsByPagination(): void{
    this.bungalowService.getBungalowsByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.bungalows = data.content;
        this.totalPages = data.totalPages;
        console.log('Bungalows obtenidos por paginación', this.bungalows);
      },
      (error) => {
        console.error('Error al obtener los bungalows por paginación', error);
      }
    );
  }

    nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getBungalowsByPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getBungalowsByPagination();
    }
  }

  //Método para buscar bungalow por código
  getBungalowByCodigo(): void {

    if (!this.codigoBungalowBuscado.trim()) {
      console.warn('El código del bungalow no puede estar vacío');
      this.getBungalowsByPagination();
      return;
    }

    this.bungalowService.getBungalowByCodigo(this.codigoBungalowBuscado).subscribe({
      next: (data) => {
        this.bungalows = [data];
        console.log('Bungalow encontrado: ', data);
      },
      error: (error) => {
        console.error('Error al buscar el bungalow por código: ', error);
        this.bungalows = [];
      }
    });
  }

  //Método para ver la disponibilidad de los bungalows
  getBungalowByDisponibility(disponibles: boolean): void {
    this.disponibilidadSeleccionada = disponibles;
    this.bungalowService.getBungalowDisponibles(this.currentPage, this.pageSize,disponibles).subscribe({
      next: (data) => {
        this.bungalows = data.content;
        this.totalPages = data.totalPages;
        console.log('Bungalows disponibles: ', this.bungalows);
      },
      error: (error) => {
        console.error('Error al buscar los bungalows por su disponibilidad: ', error);
        this.bungalows = [];
      }
    });
  }

  //Esto es para limpiar los filtros
  cleanFilters(): void {
    this.codigoBungalowBuscado = '';
    this.disponibilidadSeleccionada = null;
    this.currentPage = 0; // Reiniciar a la primera página
    this.getBungalowsByPagination();
  }


}
