import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteBungalow } from '../models/ClienteBugalow';

@Injectable({
  providedIn: 'root'
})
export class ServicioBungalowService {

  private servicioBungalowUpdateSource = new BehaviorSubject<void>(undefined);
  servicioBungalowUpdate$ = this.servicioBungalowUpdateSource.asObservable();

  constructor(private http: HttpClient) { }

  //Para notificar que se actualice la lista de servicios de bungalow
  notifyServicioBungalowUpdate(){
    this.servicioBungalowUpdateSource.next();
  }

  addServicioBungalow(servicioBungalow: ClienteBungalow): Observable<any>{
    return this.http.post('http://localhost:8080/api/v1/servicio-bungalow/', servicioBungalow);
  }

  updateServicioBungalow(id: number, servicioBungalow: ClienteBungalow): Observable<any>{
    return this.http.put('http://localhost:8080/api/v1/servicio-bungalow/id/' + id, servicioBungalow);
  }

  getServicioBungalowByPagination(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/pagination', { params });
  }

  getServicioBungalowById(id: number): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/id/' + id);
  }

  getServicioBungalowByFechaPagination(page: number, size: number, fechaInicio: Date): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString())
                                   .set('fechaInicio', fechaInicio.toISOString().split('T')[0]);
    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/pagination/fecha', { params });
  }

  getServicioBungalowByFechaBetween(page: number, size: number, desde: Date, hasta: Date): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                    .set('size', size.toString())
                                    .set('desde', desde.toISOString().split('T')[0])
                                    .set('hasta', hasta.toISOString().split('T')[0]);

    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/pagination/fecha-between', { params });
  }

  getServicioBungalowByClienteDni(page: number, size: number, dni: string): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                    .set('size', size.toString())
                                    .set('dni', dni);
    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/pagination/cliente-dni', { params });
  }

  getServicioBungalowByMetodoPagoAndFechaBetween(page: number, size: number, metodoPago: string, desde: Date, hasta: Date): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                    .set('size', size.toString())
                                    .set('nameMetodoPago', metodoPago)
                                    .set('desde', desde.toISOString().split('T')[0])
                                    .set('hasta', hasta.toISOString().split('T')[0]);
    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/pagination/metodoPago/fecha-between', { params });
  }

  exportPdfByFilters(dni?: string, metodoPago?: string, fechaInicio?: Date, desde?: Date, hasta?: Date): Observable<any>{
       let params = new HttpParams();

    if (dni) {
      params = params.set('dni', dni);
    }
    if (metodoPago && desde && hasta) {
      params = params.set('metodoPago', metodoPago)
                     .set('desde', desde.toISOString().split('T')[0])
                     .set('hasta', hasta.toISOString().split('T')[0]);

    }
    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio.toISOString().split('T')[0]);
    }
    if (desde && hasta) {
      params = params.set('desde', desde.toISOString().split('T')[0])
                     .set('hasta', hasta.toISOString().split('T')[0]);
    }
    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/exportar-pdf', { responseType: 'blob', params });
  }

  exportPdfById(id: number): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/servicio-bungalow/exportar-pdf/id/' + id, { responseType: 'blob' });
  }
}
