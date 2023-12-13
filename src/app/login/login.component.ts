import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: String = ""
  password: String = ""
  token : any = "token"

  url = "http://127.0.0.1:8000/auth/token"
 
  loginForm: FormGroup;

  appComponentVar: AppComponent;

  constructor(
    private router: Router,
    private loginService : LoginService,
    private formBuilder: FormBuilder,
    private appComponent: AppComponent

  ){

    this.appComponentVar = appComponent;
    appComponent.showSidebar = false


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  
  Submit() {

    this.token = "token"


    console.log(this.loginForm.value)
 if (this.loginForm.valid) {
  const username = this.loginForm.value.username;
  const password = this.loginForm.value.password;

console.log("username :" , username)
console.log("password :" , password)

var tokenRequest: Login = {
  password: password,
  username: username
};
this.loginService.getToken(tokenRequest).subscribe(TokenResponse => {
  console.log(TokenResponse);
  this.token = TokenResponse.data.access_token;
  localStorage.setItem("token" , this.token);
  this.appComponentVar.showSidebar = true
  this.router.navigate(["/home"])
})
  
    }else {
      alert("form is not valid")
    }
     
    
  }

 
}