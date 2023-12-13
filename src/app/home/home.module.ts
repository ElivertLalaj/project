import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared.module';
import { AuthGuard } from '../login/AuthGuard';

const routes: Routes = [

{path: "home" , component: HomeComponent , canActivate : [AuthGuard]}

];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),SharedModule
  ]
  
})
export class HomeModule { }
