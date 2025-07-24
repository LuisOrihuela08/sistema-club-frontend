import { Component, OnInit } from '@angular/core';
import { Hospedaje } from '../../../shared/models/Hospedaje';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HospedajesService } from '../../../shared/services/hospedajes.service';
import { ModalService } from '../../../shared/services/modal.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospedaje-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './hospedaje-add-modal.component.html',
  styleUrl: './hospedaje-add-modal.component.css'
})
export class HospedajeAddModalComponent implements OnInit {

  hospedaje: Hospedaje = new Hospedaje();
  hospedajeForm!: FormGroup;
  tiposHabitacion: string[] = [];

  constructor(private hospedajeService: HospedajesService,
              private modalService: ModalService,
              private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.hospedajeForm = this.fb.group({
      codigoHabitacion: ['', Validators.required],
      capacidad: [0, Validators.required],
      precio: [0, Validators.required],
      descripcion: ['', Validators.required],
      tipoHabitacion: ['', Validators.required],
      disponible: [true, Validators.required]
    });

    //Con esto estoy llamando al método que lista los tipos de habitaciones
    this.getTipoHabitacion();

    console.log(this.hospedajeForm.value);
    this.hospedajeForm.valueChanges.subscribe((value) => {
      console.log('Valores agregados: ', value);
    });
  }

  //Para cerrar el modal
  closeModalAddHospedaje(){
    this.modalService.$modalAgregarHospedaje.emit(false);
  }

  //Para agregar un nuevo hospedaje
  addHospedaje(): void {

    if (this.hospedajeForm.invalid) {
      console.log('Formulario inválido: ', this.hospedajeForm.invalid );
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    const nuevoHospedaje = this.hospedajeForm.value;

    this.hospedajeService.addHospedaje(nuevoHospedaje).subscribe({
      next: (response) => {
        console.log('Hospedaje agregado: ', response);
        Swal.fire({
          icon: "success",
          title: "Cuarto de hospedaje agregado",
          text: "El cuarto de hospedaje se ha agregado exitosamente.",
          confirmButtonText: "Aceptar"
        });
        this.hospedajeService.notifyHospedajeUpdate();//Notifico para actualizar la lista de hospedajes

        this.hospedajeForm.reset();
        this.closeModalAddHospedaje();
      },
      error: (error) => {
        console.error('Error al agregar el hospedaje: ', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el cuarto de hospedaje. Por favor, inténtalo de nuevo.",
          confirmButtonText: "Aceptar"
        });
      }
    });
  }

  //Esto es para listar los tipos de habitaciones
  getTipoHabitacion(): void {
    this.hospedajeService.getTipoHabitacion().subscribe({
      next: (data) => {
        this.tiposHabitacion = data;
        console.log('Tipos de habitación: ', this.tiposHabitacion);
      },
      error: (error) => {
        console.error('Error al obtener los tipos de habitación: ', error);
      }
    });
  }


}
