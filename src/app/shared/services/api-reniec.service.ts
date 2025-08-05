import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiReniecService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDniData(dni: string){
    return this.http.get(this.url + '/reniec/' + dni);
  }
}
