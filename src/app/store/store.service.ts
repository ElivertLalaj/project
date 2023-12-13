import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  url = "http://127.0.0.1:8000/api/store"
  StoreId = 0



  constructor( 
    private http : HttpClient,
    private route: ActivatedRoute,
  ) {
   
   }
 
 
  getStore<T>() : Observable<T> {
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),
      // 'Content-Type': 'application/json'
    })
    // debugger
    return this.http.get<T>(this.url + '/getAllStores',{headers : headers});
  }

  deleteStore<T>(StoreId: number ) : Observable<T> {
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.delete<T>(this.url + `/${StoreId}` ,{headers : headers});
  }

  getStoreById<T>(StoreId: String) : Observable<T> {
    const headers = new HttpHeaders ({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.get<T>(this.url + `/` + StoreId ,{headers : headers});
  }
  
  editSendData(data: any){
    const url = this.url + this.StoreId
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


  
  

