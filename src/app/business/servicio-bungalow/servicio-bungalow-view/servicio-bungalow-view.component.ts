import { Component, Input, OnInit } from '@angular/core';
import { ServicioBungalowService } from '../../../shared/services-graphql/servicio-bungalow.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../shared/services/modal.service';
import { ClienteBungalow } from '../../../shared/models/ClienteBugalow';

@Component({
  selector: 'app-servicio-bungalow-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicio-bungalow-view.component.html',
  styleUrl: './servicio-bungalow-view.component.css'
})
export class ServicioBungalowViewComponent implements OnInit{

  @Input() idServicioBungalow!: number;
  detalle: ClienteBungalow = new ClienteBungalow();

  constructor(private servicioBungalowGraphql: ServicioBungalowService,
              private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.viewDetalleServicioBungalow();
  }

  viewDetalleServicioBungalow(): void {
    if(this.idServicioBungalow){
      this.servicioBungalowGraphql.getBungalowById(this.idServicioBungalow).subscribe({
        next: (data) => {
          this.detalle = data;
          console.log(this.detalle);
        },
        error: (err) => {
          console.error('Error al cargar los detalles del servicio de bungalow: ', err);
        }
      });
    }
  }

  closeModalViewServicioBungalow(): void {
    this.modalService.$modalViewServicioBungalow.emit(false);
  }

}
