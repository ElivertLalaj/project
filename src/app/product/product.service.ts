import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  url = "http://127.0.0.1:8000/api/products"

  apiKey = "889811a32571498fa86135123232612"

  constructor(
    private http: HttpClient,

  ) { }




  getProducts<T>(): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token'),
    })

    return this.http.get<T>(this.url + '/getAllProducts', { headers: headers });
  }

  deleteProduct<T>(productId: number): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token'),
    })

    return this.http.delete<T>(this.url + `/${productId}`, { headers: headers });
  }

  getProductById<T>(productId: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    })

    return this.http.get<T>(this.url + '/' + productId, { headers: headers })
  }
  editSendData(data: any, productId: number) {

    const url = this.url + '/' + productId
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.put(url, data, { headers: headers });
  }
  addSendData(data: any) {

    const url = this.url
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.post(url, data, { headers: headers });
  }
}
