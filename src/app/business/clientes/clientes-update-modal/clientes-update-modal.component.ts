import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../../shared/models/Cliente';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ModalService } from '../../../shared/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-update-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './clientes-update-modal.component.html',
  styleUrl: './clientes-update-modal.component.css'
})
export class ClientesUpdateModalComponent implements OnInit{

  @Input() cliente!: Cliente; // Recibe el objeto Cliente desde el componente padre
  clienteForm!: FormGroup;

  constructor(private clienteService: ClienteService,
              private modalService: ModalService,
              private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      id: [this.cliente.id],
      name: [this.cliente.name],
      lastName: [this.cliente.lastName],
      dni: [this.cliente.dni],
      district: [this.cliente.district],
      telephone: [this.cliente.telephone]
    });

    //Aca verifico los valores a editar
    console.log(this.clienteForm.value);
    this.clienteForm.valueChanges.subscribe((value) => {
      console.log('Valores actuales del formulario: ', value);
    });
  }

  //Esto es para cerrrar el modal
  closeModalUpdateCliente(){
    this.modalService.$modalEditarCliente.emit(false);
  }

  //Método para actualizar el cliente
  updateCliente(){

    if (this.clienteForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const clienteUpdate: Cliente = this.clienteForm.value;

    this.clienteService.updateCliente(this.cliente.id, clienteUpdate).subscribe({
      next: (response) => {
        console.log('Cliente actualizado: ', response);
        this.clienteService.notifyClienteUpdate(); // Notificamos para actualizar la lista de clientes
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado',
          text: 'El cliente ha sido actualizado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.closeModalUpdateCliente(); // Cerramos el modal
      },
      error: (error) => {
        console.error('Error al actualizar el cliente: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Error al actualizar el cliente',
          confirmButtonText: 'Aceptar'
        })
      }
    })

  }
}
