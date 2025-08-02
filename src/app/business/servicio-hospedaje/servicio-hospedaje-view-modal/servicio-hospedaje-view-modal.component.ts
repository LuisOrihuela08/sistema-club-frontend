import { Component, Input, OnInit } from '@angular/core';
import { ClienteHospedaje } from '../../../shared/models/ClienteHospedaje';
import { ServicioHospedajeService } from '../../../shared/services-graphql/servicio-hospedaje.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-servicio-hospedaje-view-modal',
  standalone: true,
  imports: [],
  templateUrl: './servicio-hospedaje-view-modal.component.html',
  styleUrl: './servicio-hospedaje-view-modal.component.css'
})
export class ServicioHospedajeViewModalComponent implements OnInit{

  @Input() idServicioHospedaje!: number;
  detalle: ClienteHospedaje = new ClienteHospedaje();

  constructor(private servicioHospedajeGraphQL: ServicioHospedajeService,
              private modalService: ModalService
  ){}


  ngOnInit(): void {
    this.viewDetalleServicioHospedaje();
  }

  closeModalViewServicioHospedaje(): void {
    this.modalService.$modalViewServicioHospedaje.emit(false);
  }

  viewDetalleServicioHospedaje(): void{
    if (this.idServicioHospedaje) {
      this.servicioHospedajeGraphQL.getHospedajeById(this.idServicioHospedaje).subscribe({
        next: (data) => {
          this.detalle = data;
          console.log(this.detalle);
        },
        error: (err) => {
          console.error('Error al cargar los detalles del servicio de hospedaje: ', err);
        }
      });
    }
  }



}
