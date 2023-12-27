import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AuthGuard } from '../login/AuthGuard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {path: "products" , component: ProductComponent , canActivate: [AuthGuard] },
  {path: "products/:id" , component: ProductEditComponent , canActivate: [AuthGuard] },

  {path: "addProduct" , component: ProductEditComponent , canActivate: [AuthGuard] },





];


@NgModule({
  declarations: [
    ProductComponent,
    ProductEditComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
