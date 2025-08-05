import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteHospedaje } from '../models/ClienteHospedaje';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioHospedajeService {

  private servicioHospedajeUpdateSource = new BehaviorSubject<void>(undefined);
  servicioHospedajeUpdate$ = this.servicioHospedajeUpdateSource.asObservable();

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  notifyServicioHospedajeUpdate() {
    this.servicioHospedajeUpdateSource.next();
  }

  addServicioHospedaje(servicioHospedaje: ClienteHospedaje): Observable<any> {
    return this.http.post(this.url + '/servicio-hospedaje/', servicioHospedaje);
  }

  updateServicioHospedaje(id: number, servicioHospedaje: ClienteHospedaje): Observable<any> {
    return this.http.put(this.url + '/servicio-hospedaje/id/' + id, servicioHospedaje);
  }

  getServicioHospedajeByPagination(page: number, size: number) {
    const params = new HttpParams().set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(this.url + '/servicio-hospedaje/pagination', { params });
  }

  getServicioHospedajeByFechaPagination(page: number, size: number, fechaInicio: Date): Observable<any> {
    const params = new HttpParams().set('page', page.toString())
      .set('size', size.toString())
      .set('fechaInicio', fechaInicio.toISOString().split('T')[0]);
    return this.http.get(this.url + '/servicio-hospedaje/pagination/fecha', { params });
  }
  getServicioHospedajeByFechaBetween(page: number, size: number, desde: Date, hasta: Date): Observable<any> {
    const params = new HttpParams().set('page', page.toString())
      .set('size', size.toString())
      .set('desde', desde.toISOString().split('T')[0])
      .set('hasta', hasta.toISOString().split('T')[0]);

    return this.http.get(this.url + '/servicio-hospedaje/pagination/fecha-between', { params });
  }
  getServicioHospedajeByClienteDni(page: number, size: number, dni: string): Observable<any> {
    const params = new HttpParams().set('page', page.toString())
      .set('size', size.toString())
      .set('dni', dni);
    return this.http.get(this.url + '/servicio-hospedaje/pagination/dni', { params });
  }

  getServicioHospedajeByMetodoPagoAndFechaBetween(page: number, size: number, metodoPago: string, desde: Date, hasta: Date): Observable<any> {
    const params = new HttpParams().set('page', page.toString())
      .set('size', size.toString())
      .set('nameMetodoPago', metodoPago)
      .set('desde', desde.toISOString().split('T')[0])
      .set('hasta', hasta.toISOString().split('T')[0]);
    return this.http.get(this.url + '/servicio-hospedaje/pagination/metodoPago/fecha-between', { params });
  }

  exportPdfByFilters(dni?: string, metodoPago?: string, fechaInicio?: Date, desde?: Date, hasta?: Date): Observable<any> {
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
    return this.http.get(this.url + '/servicio-hospedaje/exportar-pdf', { responseType: 'blob', params });
  }

  exportPdfById(id: number): Observable<any> {
    return this.http.get(this.url + '/servicio-hospedaje/exportar-pdf/id/' + id, { responseType: 'blob' });
  }

  exportExcelByFilters(dni?: string, metodoPago?: string, fechaInicio?: Date, desde?: Date, hasta?: Date): Observable<any> {
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
    return this.http.get(this.url + '/servicio-hospedaje/exportar-excel', { responseType: 'blob', params });
  }
}
