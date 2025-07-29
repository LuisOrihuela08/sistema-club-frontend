import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiReniecService {

  constructor(private http: HttpClient) { }

  getDniData(dni: string){
    return this.http.get('http://localhost:8080/api/v1/reniec/' + dni);
  }
}
