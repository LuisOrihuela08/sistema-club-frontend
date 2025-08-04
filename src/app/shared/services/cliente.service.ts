import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //Para actualizar los clientes en tiempo real
  private clienteUpdateSource = new BehaviorSubject<void>(undefined);
  clienteUpdate$ = this.clienteUpdateSource.asObservable();

  constructor(private http: HttpClient) { }

  //Método para actualizar los clientes
  notifyClienteUpdate(){
    this.clienteUpdateSource.next();
  }

  //Método para listar los clientes por paginación
  getClientesByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString());
    return this.http.get('http://localhost:8080/api/v1/cliente/pagination', {params});
  }

  //Método para buscar cliente por DNI
  getClienteByDni(dni: string): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/cliente/dni/' + dni);
  }

  //Método para actualizar un cliente
  updateCliente(id: number, cliente: Cliente): Observable<any>{
    return this.http.put('http://localhost:8080/api/v1/cliente/id/' + id, cliente);
  }

  //Método para exportar clientes a Excel
  exportClientesToExcel(): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/cliente/exportar/clientes/excel', { responseType: 'blob' });
  }
}
