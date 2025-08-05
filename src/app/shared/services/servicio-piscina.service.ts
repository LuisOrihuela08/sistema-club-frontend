import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientePiscina } from '../models/ClientePiscina';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioPiscinaService {

  private servicioPiscinaUpdateSource = new BehaviorSubject<void>(undefined);
  servicioPiscinaUpdate$ = this.servicioPiscinaUpdateSource.asObservable();

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Método para actualizar el listado del servicio de piscina
  notifyServicioPiscinaUpdate(){
    this.servicioPiscinaUpdateSource.next();
  }

  getServicioPiscinaByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                    .set('size', size.toString());
    return this.http.get(this.url + '/servicio-piscina/pagination', {params});
  }

  getServicioPiscinaByFechaPagination(page: number, size: number, fecha: Date): Observable<any>{
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('fecha', fecha.toISOString().split('T')[0]); //Convierte Date al formato YYYY-MM-DD, ya que asi lo espera el backend

    return this.http.get(this.url + '/servicio-piscina/pagination/fecha', { params });
  }

  getServicioPiscinaByFechaBetween(page: number, size: number, desde: Date, hasta: Date): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                    .set('size', size.toString())
                                    .set('desde', desde.toISOString().split('T')[0])
                                    .set('hasta', hasta.toISOString().split('T')[0]);

    return this.http.get(this.url + '/servicio-piscina/pagination/fecha-between', { params });
  }

  getServicioPiscinaByClienteDni(page: number, size: number, dni: string): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                    .set('size', size.toString())
                                    .set('dni', dni);

    return this.http.get(this.url + '/servicio-piscina/pagination/dni', { params });
  }

  getServicioPiscinaByMetodoPagoAndFechaBetween(page: number, size: number, metodoPago: string, desde: Date, hasta: Date): Observable<any>{
    const params = new HttpParams()
                                  .set('page', page.toString())
                                  .set('size', size.toString())
                                  .set('metodoPago', metodoPago)
                                  .set('desde', desde.toISOString().split('T')[0])
                                  .set('hasta', hasta.toISOString().split('T')[0]);

    return this.http.get(this.url + '/servicio-piscina/pagination/metodo-pago-fecha', { params });
  }

  addServicioPiscina(servicioPiscina: ClientePiscina): Observable<any>{
    return this.http.post(this.url + '/servicio-piscina/', servicioPiscina);
  }

  updateServicioPiscina(id: number, servicioPiscina: ClientePiscina): Observable<any>{
    return this.http.put(this.url + '/servicio-piscina/id/' + id, servicioPiscina);
  }

  exportPdfServicioPiscina(dni?: string, metodoPago?: string, fechaInicio?: Date, desde?: Date, hasta?: Date): Observable<any>{
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

    return this.http.get(this.url + '/servicio-piscina/exportar-pdf', { responseType: 'blob', params });
  }

  exportServicioPiscinaPdfById(id: number): Observable<any>{
    return this.http.get(this.url + '/servicio-piscina/exportar-pdf/id/' + id, { responseType: 'blob' });
  }

  //Para generar Excel
  exportExcelServicioPiscina(dni?: string, metodoPago?: string, fechaInicio?: Date, desde?: Date, hasta?: Date): Observable<any>{
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
    return this.http.get(this.url + '/servicio-piscina/exportar-excel', { responseType: 'blob', params });
  }

}
