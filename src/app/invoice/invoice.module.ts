import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvioceComponent } from './invioce.component';
import { AuthGuard } from '../login/AuthGuard';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';


const routes: Routes = [
  {path: "invoice" , component: InvioceComponent , canActivate: [AuthGuard] },
  {path: "invoice/:id" , component: InvoiceListComponent , canActivate: [AuthGuard] },
  {path: "invoiceList" , component: InvoiceListComponent , canActivate: [AuthGuard] },



];

@NgModule({
  declarations: [
    InvioceComponent,
    InvoiceListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class InvoiceModule {}
