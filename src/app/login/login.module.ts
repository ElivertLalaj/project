import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [

  {path: "login" , component: LoginComponent},


  


];

@NgModule({
  declarations: [
    LoginComponent
  ],
 
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule]

})
export class LoginModule { }
