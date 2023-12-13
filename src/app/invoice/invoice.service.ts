import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {BsModalService } from 'ngx-bootstrap/modal';
import { InvoiceModalComponent } from './invoice-modal/invoice-modal.component';
import { InvoiceRequest } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  url: string = 'http://127.0.0.1:8000/api/invoice';
  

baseUrl = "http://127.0.0.1:8000/api/invoice_product"


  constructor(private http: HttpClient, 
              private modalService: BsModalService
    ) {

  }

  getInvoice<T>(): Observable<T> {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<T>(this.url + '/getAllInvoices', { headers: headers });
  }
  deleteInvoice<T>(invoiceId: number): Observable<T> {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<T>(this.url + `/${invoiceId}`, {
      headers: headers,
    });
  }

showModal(){
  this.modalService.show(InvoiceModalComponent)
}

getInvoiceProductById<T>(id: string): Observable<T>{
  const headers = new HttpHeaders({
    Authorization: 'bearer ' + localStorage.getItem('token'),
  });
  return this.http.get<T>(this.baseUrl + '/getInvoiceProductByProductId/' + id, { headers: headers });
}

saveInvoice<T>(data: InvoiceRequest) : Observable<T>{
  const headers = new HttpHeaders({
    Authorization: 'bearer ' + localStorage.getItem('token'),
  });
  const url = this.url 

  return this.http.post<T>(url , data , { headers: headers });
}

editInvoice<T>(invoiceId: string ,data: InvoiceRequest) : Observable<T>{
  const headers = new HttpHeaders({
    Authorization: 'bearer ' + localStorage.getItem('token'),
  });
  return this.http.put<T>(this.url + '/' + invoiceId , data , { headers: headers });
}

  
}