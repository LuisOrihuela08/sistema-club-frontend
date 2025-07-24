import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bungalow } from '../models/Bungalow';

@Injectable({
  providedIn: 'root'
})
export class BungalowsService {

  //Para actualizar los bungalows en tiempo real
  private bungalowUpdateSource = new BehaviorSubject<void>(undefined);
  bungalowUpdate$ = this.bungalowUpdateSource.asObservable();

  constructor(private http: HttpClient) { }

  //Método para actualizar los clientes
  notifyBungalowUpdate(){
    this.bungalowUpdateSource.next();
  }

  //Método para listar los bungalows por paginación
  getBungalowsByPagination(page: number, size: number){
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString());
    return this.http.get('http://localhost:8080/api/v1/bungalow/pagination', {params});
  }

  //Método para buscar bungalow por código
  getBungalowByCodigo(codigo: string): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/bungalow/codigo/' + codigo);
  }

  //Método para ver los bungalows disponibles
  getBungalowDisponibles(page: number, size: number, disponible: boolean): Observable<any>{
    const params = new HttpParams().set('page', page.toString())
                                   .set('size', size.toString())
                                   .set('disponible', disponible.toString());
    return this.http.get('http://localhost:8080/api/v1/bungalow/disponibilidad', {params});
  }

  //Método para agregar un bungalow
  addBungalow(bungalow: Bungalow): Observable<any>{
    return this.http.post('http://localhost:8080/api/v1/bungalow', bungalow);
  }

  //Método para actualizar un bungalow
  updateBungalow(id: number, bungalow: Bungalow): Observable<any>{
    return this.http.put('http://localhost:8080/api/v1/bungalow/id/' + id, bungalow);
  }
}
