import { Component, Input, OnInit } from '@angular/core';
import { Hospedaje } from '../../../shared/models/Hospedaje';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospedajesService } from '../../../shared/services/hospedajes.service';
import { ModalService } from '../../../shared/services/modal.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospedaje-update-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hospedaje-update-modal.component.html',
  styleUrl: './hospedaje-update-modal.component.css'
})
export class HospedajeUpdateModalComponent implements OnInit {

  @Input() hospedaje!: Hospedaje; // Recibe el objeto Hospedaje desde el componente padre
  hospedajeForm!: FormGroup;
  tiposHabitacion: string[] = [];

  constructor(private hospedajeService: HospedajesService,
              private modalService: ModalService,
              private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.hospedajeForm = this.fb.group({
      id: [this.hospedaje.id],
      codigoHabitacion: [this.hospedaje.codigoHabitacion],
      capacidad: [this.hospedaje.capacidad],
      precio: [this.hospedaje.precio],
      descripcion: [this.hospedaje.descripcion],
      tipoHabitacion: [this.hospedaje.tipoHabitacion],
      disponible: [this.hospedaje.disponible]
    });

    //Para listar los tipos de habitaciones
    this.getTipoHabitacion();

    console.log(this.hospedajeForm.value);
    this.hospedajeForm.valueChanges.subscribe((value) => {
      console.log('Valores actuales del formulario: ', value);
    })
  }

  //Para cerrar el modal
  closeModalUpdateHospedaje(){
    this.modalService.$modalEditarHospedaje.emit(false);
  }

  updateHospedaje(): void {
    if (this.hospedajeForm.invalid) {
      console.log('Formulario inválido');
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const updateHospedaje: Hospedaje = this.hospedajeForm.value;

    this.hospedajeService.updateHospedaje(this.hospedaje.id, updateHospedaje).subscribe({
      next: (response) => {
        console.log('Hospedaje actualizado: ', response);
        Swal.fire({
          icon: 'success',
          title: 'Hospedaje actualizado',
          text: 'El hospedaje ha sido actualizado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.hospedajeService.notifyHospedajeUpdate(); // Notifico para que se actualice el listado de hospedajes
        this.closeModalUpdateHospedaje(); // Cierro el modal después de actualizar
      },
      error: (error) => {
        console.error('Error al actualizar el hospedaje: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Error al actualizar el hospedaje',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  //Esto es para listar los tipos de habitaciones
  getTipoHabitacion(): void {
    this.hospedajeService.getTipoHabitacion().subscribe({
      next: (data) => {
        this.tiposHabitacion = data;
        console.log('Tipos de habitación obtenidos: ', this.tiposHabitacion);
      },
      error: (error) => {
        console.error('Error al obtener los tipos de habitación: ', error);
      }
    });
  }


}
