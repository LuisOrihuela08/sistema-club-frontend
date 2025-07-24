import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hospedaje } from '../models/Hospedaje';

@Injectable({
  providedIn: 'root'
})
export class HospedajesService {

  //Para actualizar los hospedajes en tiempo real
  private hospedajeUpdateSource = new BehaviorSubject<void>(undefined);
  hospedajeUpdate$ = this.hospedajeUpdateSource.asObservable();

  constructor(private http: HttpClient) { }

  //Método para actualizar la lista de hospedajes
  notifyHospedajeUpdate(){
    this.hospedajeUpdateSource.next();
  }

  getHospedajeByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString());
    return this.http.get('http://localhost:8080/api/v1/hospedaje/pagination', {params});
  }

  getHospedajeByCodigo(codigo: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/v1/hospedaje/codigo/' + codigo);
  }

  getTipoHabitacion(): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/hospedaje/tipos-habitacion');
  }

  addHospedaje(hospedaje: Hospedaje): Observable<any>{
    return this.http.post('http://localhost:8080/api/v1/hospedaje/', hospedaje);
  }

  updateHosedaje(id:number, hospedaje: Hospedaje): Observable<any>{
    return this.http.put('http://localhost:8080/api/v1/hospedaje/id/' + id, hospedaje);
  }
}
