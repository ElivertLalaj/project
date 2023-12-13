import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  url = "http://127.0.0.1:8000/api/products"


  productId = 0

  constructor(
    private http: HttpClient,

  ) { }




  getProducts<T>() : Observable<T> {
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),
    })
    // debugger
    return this.http.get<T>(this.url + '/getAllProducts',{headers : headers});
  }

  deleteProduct<T>(productId: number) : Observable<T>{
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),
    })
    // debugger
    return this.http.delete<T>(this.url + `/${productId}`,{headers : headers});
  }

  getProductById<T>(productId: string) :Observable<T>{
    const headers = new HttpHeaders ({
      'Authorization': 'Bearer '+ localStorage.getItem('token'),
    })

    return this.http.get<T>(this.url + '/' + productId, {headers : headers})
  }
  editSendData(data: any){

    const url = this.url + this.productId
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.put(url, data ,{headers : headers});
  }
  addSendData(data: any){

    const url = this.url 
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.post(url, data ,{headers : headers});
  }
}
