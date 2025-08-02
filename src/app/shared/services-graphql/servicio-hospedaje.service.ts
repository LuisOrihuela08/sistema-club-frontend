import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioHospedajeService {

  constructor(private apollo: Apollo) { }

  getHospedajeById(id: number): Observable<any> {
      return this.apollo
        .query({
          query: gql`
            query($id: ID!) {
              findClienteHospedajeById(id: $id) {
                fechaInicio
                fechaFin
                montoTotal
                cliente {
                  name
                  lastName
                  dni
                  district
                  telephone
                }
                hospedaje {
                  codigoHabitacion
                  precio
                  capacidad
                  descripcion
                  tipoHabitacion
                }
                metodoPago {
                  name
                }
              }
            }
          `,
          variables: { id }
        })
        .pipe(map((result: any) => result.data.findClienteHospedajeById));
    }
}
