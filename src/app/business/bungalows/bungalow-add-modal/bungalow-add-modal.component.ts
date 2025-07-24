import { Component, OnInit } from '@angular/core';
import { Bungalow } from '../../../shared/models/Bungalow';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BungalowsService } from '../../../shared/services/bungalows.service';
import { ModalService } from '../../../shared/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bungalow-add-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './bungalow-add-modal.component.html',
  styleUrl: './bungalow-add-modal.component.css'
})
export class BungalowAddModalComponent implements OnInit {

  bungalow: Bungalow = new Bungalow();
  bungalowForm!: FormGroup;

  constructor(private bungalowService: BungalowsService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bungalowForm = this.fb.group({
      codigo: ['', Validators.required],
      capacidad: [0, Validators.required],
      precio: [0, Validators.required],
      descripcion: ['', Validators.required],
      disponible: [true, Validators.required]
    });

    console.log(this.bungalowForm.value);
    this.bungalowForm.valueChanges.subscribe((value) => {
      console.log('Valores agregados: ', value);
    });
  }

  //Esto es para cerrar el modal
  closeModalAddBungalow() {
    this.modalService.$modalAgregarBungalow.emit(false);
  }

  //Método para agregar un nuevo bungalow
  addBungalow(): void {

    if (this.bungalowForm.invalid) {
      console.log('Formulario inválido:', this.bungalowForm.invalid);
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const nuevoBungalow = this.bungalowForm.value;

    this.bungalowService.addBungalow(nuevoBungalow).subscribe({
      next: (response) => {
        console.log('Bungalow agregado: ', response);
        Swal.fire({
          icon: "success",
          title: "Bungalow agregado",
          text: "El bungalow se ha agregado exitosamente.",
          confirmButtonText: "Aceptar"
        });

        //Aca notifico al servicio para que actualice el listado de los bungalows
        this.bungalowService.notifyBungalowUpdate();

        //Luego reseteo el formulario y lo cierro
        this.bungalowForm.reset();
        this.closeModalAddBungalow();
      },
      error: (error) => {
        console.error('Error al agregar el bungalow: ', error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el bungalow. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Aceptar"
        });
      }
    });
  }
}
