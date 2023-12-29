import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WetherComponent } from './wether.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/AuthGuard';
import { SharedModule } from '../shared.module';




const routes: Routes = [
  {path: "weather" , component: WetherComponent , canActivate: [AuthGuard] },
  

];

@NgModule({
  declarations: [
    WetherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes),
  ]
})
export class WetherModule { }
