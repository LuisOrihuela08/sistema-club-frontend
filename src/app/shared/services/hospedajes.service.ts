import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hospedaje } from '../models/Hospedaje';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospedajesService {

  //Para actualizar los hospedajes en tiempo real
  private hospedajeUpdateSource = new BehaviorSubject<void>(undefined);
  hospedajeUpdate$ = this.hospedajeUpdateSource.asObservable();

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Método para actualizar la lista de hospedajes
  notifyHospedajeUpdate(){
    this.hospedajeUpdateSource.next();
  }

  getHospedajes(): Observable<any>{
    return this.http.get(this.url + '/hospedaje/');
  }

  getHospedajeByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString());
    return this.http.get(this.url + '/hospedaje/pagination', {params});
  }

  getHospedajeByCodigo(codigo: string): Observable<any> {
    return this.http.get(this.url + '/hospedaje/codigo/' + codigo);
  }

  getHospedajeDisponibles(): Observable<any>{
    return this.http.get(this.url + '/hospedaje/disponibles');
  }

  getHospedajeByDisponibilidad(page: number, size:number, disponible: boolean): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString())
                                   .set('disponible', disponible.toString());
    return this.http.get(this.url + '/hospedaje/disponibilidad', {params});
  }

  getTipoHabitacion(): Observable<any>{
    return this.http.get(this.url + '/hospedaje/tipos-habitacion');
  }

  addHospedaje(hospedaje: Hospedaje): Observable<any>{
    return this.http.post(this.url + '/hospedaje/', hospedaje);
  }

  updateHospedaje(id:number, hospedaje: Hospedaje): Observable<any>{
    return this.http.put(this.url + '/hospedaje/id/' + id, hospedaje);
  }
}
