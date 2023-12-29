import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WetherService {

  private apiKey = '889811a32571498fa86135123232612';
  private apiUrl = 'http://api.weatherapi.com/v1/forecast.json?key=889811a32571498fa86135123232612';


  constructor(
    private http: HttpClient,
    ) { }

    getWeather(city: string) : Observable<any> {
      const headers =  new HttpHeaders({
        "Authorization": 'bearer ' + localStorage.getItem('token')
      })
    const params = {
      q: city,
      appid: this.apiKey,
    }

    return this.http.get(this.apiUrl, {headers, params})



    }
}
