import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../shared/models/Cliente';
import { ClienteService } from '../../shared/services/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] =[];
  dniClienteBuscado: string = '';// Esto es para realizar la busqueda del cliente por DNI

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.getClienteByPagination();
  }

  //Método para listar clientes por paginación
  getClienteByPagination(): void {
    this.clienteService.getClientesByPagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.clientes = data.content; // Asignar los clientes obtenidos
        this.totalPages = data.totalPages; // Actualizar el total de páginas
        console.log('Total de páginas:', this.totalPages);
        console.log('Página actual:', this.currentPage);
        console.log('Clientes listados:', this.clientes);
      },
      (error) => {
        console.error('Error al obtener los clientes por paginación: ', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getClienteByPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getClienteByPagination();
    }
  }

  //Método para buscar cliente por DNI
  getClienteByDni(): void {

    if (!this.dniClienteBuscado.trim()) {
      console.warn('El campo DNI de búsqueda está vacío. Por favor, ingrese un DNI válido');
      this.getClienteByPagination();
      return;
    }

    this.clienteService.getClienteByDni(this.dniClienteBuscado).subscribe({
      next: (data) => {
        this.clientes = [data]; // Asignar el cliente encontrado a la lista
        console.log('Cliente encontrado: ', this.clientes);
      },
      error: (error) => {
        console.error('Error al buscar cliente por DNI: ', error);
        this.clientes = [];
      }
    })
  }


}
