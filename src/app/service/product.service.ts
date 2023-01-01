import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }


  getAll(): Observable<any>{
    return this.http.get(environment.apiBaseUrl + '/products');
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/${id}`);
  }
  getAllActiveProducts(): Observable<any>{
    let headers = new HttpHeaders();
    let token = localStorage.getItem('bearer');
    headers.append("bearer", token ? token : "") ;

    return this.http.get(environment.apiBaseUrl + '/activeProducts', {headers: headers});
  }

  create(data: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/product', data);
  }

  update(id: any, data: any): Observable<any> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('bearer');
    headers.append("bearer", token ? token : "") ;

    return this.http.patch(environment.apiBaseUrl + '/product/' + id, data, {headers: headers});
  }

  delete(id: any): Observable<any> {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('bearer');
    headers.append("bearer", token ? token : "") ;

    return this.http.delete(environment.apiBaseUrl + '/product/' + id, {headers: headers});
  }
}