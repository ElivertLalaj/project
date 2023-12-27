import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequiredComponent } from './required.component';
import { AuthGuard } from '../login/AuthGuard';
import { SharedModule } from '../shared.module';



const routes: Routes = [
  {path: "required" , component: RequiredComponent , canActivate: [AuthGuard] },
  

];


@NgModule({
  declarations: [
    RequiredComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes),
  ]
})
export class RequiredModule { }
