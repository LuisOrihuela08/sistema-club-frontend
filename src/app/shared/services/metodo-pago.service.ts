import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from '../models/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor(private http: HttpClient) { }

  //Metodo para listar los métodos de pago
  getMetodosPago(): Observable<MetodoPago[]>{
    return this.http.get<MetodoPago[]>('http://localhost:8080/api/v1/metodo-pago/');
  }

  //Método para buscar método de pago por nombre (name)
  getMetodoPagoByName(name: string): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/metodo-pago/name/' + name);

  }


  //Método para listar los métodos de pago con paginación
  getMetodosPagoByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString());
    return this.http.get('http://localhost:8080/api/v1/metodo-pago', {params});
  }
}
