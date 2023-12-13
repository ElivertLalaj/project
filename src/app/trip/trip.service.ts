import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  url = 'http://127.0.0.1:8000/api/trips';

  tripId = 0;

  constructor(private http: HttpClient) {}

  getTriip<T>(): Observable<T> {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<T>(this.url + '/getAllTrips', { headers: headers });
  }

  deleteTrip<T>(tripId: number): Observable<T> {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<T>(this.url + `/${tripId}`, { headers: headers });
  }

  getTripById<T>(tripId: String): Observable<T> {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<T>(this.url + '/' + tripId, { headers: headers });
  }

  editSendData(data: any) {
    const url = this.url + this.tripId;
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(url, data, { headers: headers });
  }
  addSendData(data: any) {
    const url = this.url;
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(url, data, { headers: headers });
  }
}
