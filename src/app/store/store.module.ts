import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { AuthGuard } from '../login/AuthGuard';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { SharedModule } from '../shared.module';


const routes: Routes = [

  {path: "store" , component: StoreComponent , canActivate : [AuthGuard]},
  {path: "store/:id" , component: StoreEditComponent , canActivate : [AuthGuard]},
  {path: "addStore" , component: StoreEditComponent , canActivate : [AuthGuard]},



];


@NgModule({
  declarations: [
    StoreComponent,
    StoreEditComponent,


  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule
  ]
})
export class StoreModule { }
