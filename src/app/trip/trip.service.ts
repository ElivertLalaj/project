import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  url = 'http://127.0.0.1:8000/api/trips';

  tripId = 0;
  trip : Trip[] =[]

  constructor(private http: HttpClient) {}

  getTriip<T>(): Observable<T> {
    const headers = new HttpHeaders({
      "Authorization": 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<T>(this.url + '/getAllTrips', { headers: headers });
  }

  deleteTrip<T>(tripId: number): Observable<T> {
    const headers = new HttpHeaders({
      "Authorization": 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<T>(this.url + `/${tripId}`, { headers: headers });
  }

  getTripById<T>(tripId: String): Observable<T> {
    const headers = new HttpHeaders({
      "Authorization": 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<T>(this.url + '/' + tripId, { headers: headers });
  }

  editSendData(data: any , tripId: number) {
    const url = this.url + "/" +  tripId;
    const headers = new HttpHeaders({
      "Authorization": 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(url , data, { headers: headers });
  }
  addSendData(data: any) {
    const headers = new HttpHeaders({
      "Authorization": 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(this.url, data, { headers: headers });
  }
}
