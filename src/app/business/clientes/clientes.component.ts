import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from '../../shared/models/Cliente';
import { ClienteService } from '../../shared/services/cliente.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { ClientesUpdateModalComponent } from './clientes-update-modal/clientes-update-modal.component';
import { blob } from 'node:stream/consumers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ClientesUpdateModalComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[] =[];
  dniClienteBuscado: string = '';// Esto es para realizar la busqueda del cliente por DNI

  //Seccion de paginacion
  currentPage: number = 0;//Numero de pagina
  pageSize: number = 14; // Número de elementos por página
  totalPages: number = 1; // Se actualizará según la respuesta del backend

  //Sección de modal para actualizar cliente
  isModalUpdateClienteVisible: boolean = false;
  clienteSelect: Cliente | null = null; // Variable para almacenar el cliente seleccionado para poder actualizar

  //Seccion para la subscripción y actualización de clientes
  private clienteSubscribe: Subscription = undefined!; // Esto es para actualizar los clientes en tiempo real

  constructor(private clienteService: ClienteService,
              private modalService: ModalService
  ){}


  ngOnDestroy(): void {
    if (this.clienteSubscribe) {
      this.clienteSubscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getClienteByPagination();
    this.modalService.$modalEditarCliente.subscribe((valor) => {this.isModalUpdateClienteVisible =valor});
    this.clienteSubscribe = this.clienteService.clienteUpdate$.subscribe(
      () => {
        this.getClienteByPagination();
        console.log('Clientes actualizados en tiempo real');
      }
    )
  }

  //Esto es para abrir el modal de actualizar cliente
  openModalUpdateCliente(cliente: Cliente){
    this.clienteSelect = cliente;
    this.modalService.$modalEditarCliente.emit(true);
    console.log('Modal para actualzar un cliente', this.isModalUpdateClienteVisible);
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

  //Método para exportar clientes a Excel
  exportClientesToExcel(): void {
    this.clienteService.exportClientesToExcel().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clientes.xlsx'; // Nombre del archivo a descargar
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al exportar clientes a Excel: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo exportar los clientes a Excel.'
        });
      }
    });
  }

}
