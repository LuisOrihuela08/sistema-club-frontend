import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetodoPago } from '../models/MetodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  //Para actualizar los método de pago en tiempo real
  private metodoPagoUpdateSource = new BehaviorSubject<void>(undefined);
  metodoPagoUpdate$ = this.metodoPagoUpdateSource.asObservable();

  constructor(private http: HttpClient) { }

  //Método para actualizar los método de pago
  notifyMetodoPagoUpdate(){
    this.metodoPagoUpdateSource.next();
  }

  //Metodo para listar los métodos de pago
  getMetodosPago(): Observable<MetodoPago[]>{
    return this.http.get<MetodoPago[]>('http://localhost:8080/api/v1/metodo-pago/');
  }

  //Método para buscar método de pago por nombre (name)
  getMetodoPagoByName(name: string): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/metodo-pago/name/' + name);

  }

  //Método para agregar un nuevo método de pago
  createMetodoPago(metodoPago: MetodoPago): Observable<any>{
    return this.http.post('http://localhost:8080/api/v1/metodo-pago/', metodoPago);
  }

  //Método para actualizar un método de pago
  updateMetodoPago(id: number, metodoPago: MetodoPago): Observable<any>{
    return this.http.put('http://localhost:8080/api/v1/metodo-pago/' + id, metodoPago);
  }

  //Método para eliminar un método de pago por ID
  deleteMetodoPago(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/api/v1/metodo-pago/id/' + id);
  }
}
