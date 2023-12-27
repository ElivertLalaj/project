import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url = 'http://127.0.0.1:8000/api/cars';

  

  constructor(private http: HttpClient) {}

  getCars<T>(): Observable<T> {
    const headers = new HttpHeaders({
      "Authorization": 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<T>(this.url + '/getAllCars', { headers: headers });
  }

  deleteCar<T>(carId: number): Observable<T> {
    const headers = new HttpHeaders({
      "Authorization": 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.delete<T>(this.url + `/${carId}`, { headers: headers });
  }

  getCarsById<T>(carId: String): Observable<T> {
    const headers = new HttpHeaders({
      "Authorization": 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<T>(this.url + '/' + carId, { headers: headers });
  }

  editSendData(data: any, carId: number) {
    const url = this.url + '/' + carId
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token'),

    })

    return this.http.put(url, data, { headers: headers });
  }
  addSendData(data: any) {
    const url = this.url;
    const headers = new HttpHeaders({
      "Authorization": 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post(url, data, { headers: headers });
  }
}
