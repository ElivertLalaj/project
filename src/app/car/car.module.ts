import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';
import { AuthGuard } from '../login/AuthGuard';
import { CarEditComponent } from './car-edit/car-edit.component';
import { SharedModule } from '../shared.module';


const routes: Routes = [


  {path: "car" , component: CarComponent , canActivate: [AuthGuard] },
  {path: "car/:id" , component: CarEditComponent , canActivate: [AuthGuard] },
  {path: "addCar" , component: CarEditComponent , canActivate: [AuthGuard] },


];

@NgModule({
  declarations: [
    CarComponent,
    CarEditComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
  ]
})
export class CarModule { }
