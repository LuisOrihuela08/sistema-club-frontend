import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from '../models/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor(private http: HttpClient) { }

  getMetodosPago(): Observable<MetodoPago[]>{
    return this.http.get<MetodoPago[]>('http://localhost:8080/api/v1/metodo-pago/');
  }


  //Método para listar los métodos de pago con paginación
  getMetodosPagoByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString());
    return this.http.get('http://localhost:8080/api/v1/metodo-pago', {params});
  }
}
