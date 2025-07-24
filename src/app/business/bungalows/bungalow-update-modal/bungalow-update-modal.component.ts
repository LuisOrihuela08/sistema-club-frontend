import { Component, Input, OnInit } from '@angular/core';
import { BungalowsService } from '../../../shared/services/bungalows.service';
import { ModalService } from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Bungalow } from '../../../shared/models/Bungalow';
import { CommonModule } from '@angular/common';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-bungalow-update-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './bungalow-update-modal.component.html',
  styleUrl: './bungalow-update-modal.component.css'
})
export class BungalowUpdateModalComponent implements OnInit {

  @Input() bungalow!: Bungalow; // Recibe el objeto Bungalow desde el componente padre
  bungalowForm!: FormGroup;

  constructor(private bungalowService: BungalowsService,
              private modalService: ModalService,
              private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.bungalowForm = this.fb.group({
      id: [this.bungalow.id],
      codigo: [this.bungalow.codigo],
      capacidad: [this.bungalow.capacidad],
      precio: [this.bungalow.precio],
      descripcion: [this.bungalow.descripcion],
      disponible: [this.bungalow.disponible]
    });

    //Capturo los valores que se enviaran
    console.log(this.bungalowForm.value);
    this.bungalowForm.valueChanges.subscribe((value) => {
      console.log('Valores actuales del formulario: ', value);
    })
  }

  closeModalUpdateBungalow(){
    this.modalService.$modalEditarBungalow.emit(false);
  }

  updateBungalow(): void {

    if (this.bungalowForm.invalid) {
      console.log('Formulario inválido');
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const updateBungalow: Bungalow = this.bungalowForm.value;

    this.bungalowService.updateBungalow(this.bungalow.id, updateBungalow).subscribe({
      next: (response) => {
        console.log('Bungalow actualizado: ', response);
        this.bungalowService.notifyBungalowUpdate();//Notifico para que se actualice el listado de bungalows
        Swal.fire({
          icon: 'success',
          title: 'Bungalow actualizado',
          text: 'El bungalow ha sido actualizado correctamente',
          confirmButtonText: 'Aceptar'
        });
        this.closeModalUpdateBungalow();//Y cierro el modal de actualización
      },
      error: (error) => {
        console.error('Error al actualizar el bungalow: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Error al actualizar el bungalow',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
