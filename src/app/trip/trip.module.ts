import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TripComponent } from './trip.component';
import { AuthGuard } from '../login/AuthGuard';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { SharedModule } from '../shared.module';



const routes: Routes = [
  {path: "trip" , component: TripComponent , canActivate: [AuthGuard] },
  {path: "trip/:id" , component: TripEditComponent , canActivate: [AuthGuard] },
  {path: "addTrip" , component: TripEditComponent , canActivate: [AuthGuard] },


];

@NgModule({
  declarations: [
    TripComponent,
    TripEditComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule
  ]
})
export class TripModule { }
