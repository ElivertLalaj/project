import { Injectable } from '@angular/core';
import { Login, TokenResponse } from '../models/login';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  url: String = "http://127.0.0.1:8000/auth/"



  constructor(
    private http : HttpClient
  ) { }


  getToken(UserLogInInfo : Login) : Observable<TokenResponse> {
    const headers = new HttpHeaders ({
      'content-type' : 'application/json'
    })
    
    return this.http.post<TokenResponse>(this.url + 'token' , UserLogInInfo, {headers : headers} )
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  
  }

