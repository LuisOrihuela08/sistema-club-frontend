import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioBungalowService {

  constructor(private apollo: Apollo) { }

  getBungalowById(id: number): Observable<any> {
    return this.apollo
      .query({
        query: gql`
          query($id: ID!) {
            findClienteBungalowById(id: $id) {
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
              bungalow {
                codigo
                capacidad
                precio
                descripcion
              }
              metodoPago {
                name
              }
            }
          }
        `,
        variables: { id }
      })
      .pipe(map((result: any) => result.data.findClienteBungalowById));
  }
}
