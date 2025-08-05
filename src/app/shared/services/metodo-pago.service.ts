import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetodoPago } from '../models/MetodoPago';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  //Para actualizar los método de pago en tiempo real
  private metodoPagoUpdateSource = new BehaviorSubject<void>(undefined);
  metodoPagoUpdate$ = this.metodoPagoUpdateSource.asObservable();

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Método para actualizar los método de pago
  notifyMetodoPagoUpdate(){
    this.metodoPagoUpdateSource.next();
  }

  //Metodo para listar los métodos de pago
  getMetodosPago(): Observable<MetodoPago[]>{
    return this.http.get<MetodoPago[]>(this.url + '/metodo-pago/');
  }

  //Método para buscar método de pago por nombre (name)
  getMetodoPagoByName(name: string): Observable<any>{
    return this.http.get(this.url + '/metodo-pago/name/' + name);

  }

  //Método para agregar un nuevo método de pago
  createMetodoPago(metodoPago: MetodoPago): Observable<any>{
    return this.http.post(this.url + '/metodo-pago/', metodoPago);
  }

  //Método para actualizar un método de pago
  updateMetodoPago(id: number, metodoPago: MetodoPago): Observable<any>{
    return this.http.put(this.url + '/metodo-pago/' + id, metodoPago);
  }

  //Método para eliminar un método de pago por ID
  deleteMetodoPago(id: number): Observable<any>{
    return this.http.delete(this.url + '/metodo-pago/id/' + id);
  }
}
