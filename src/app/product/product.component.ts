import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ResponseModel } from '../models/ResponseModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product: Product[] = []

  constructor(
    private productService: ProductService,
    private router: Router,

  ) { }




  editClicked(productId: any) {
    this.router.navigate(["/products/" + productId])
  }
  deleteClicked(productId: any) {
    this.productService.deleteProduct<ResponseModel<Product>>(productId).subscribe({
      next: (data: ResponseModel<Product>) => {
        this.getData()
      }
    })
  }



  addProduct() {
    this.router.navigate(["/addProduct"])

  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.productService.getProducts<ResponseModel<Product[]>>().subscribe({
      next: (data: ResponseModel<Product[]>) => {
        console.log(data.data)
        this.product = data.data

      },
      error(error: any) {
        console.error("errooorrrrrrrrr", error)
      }

    })
  }



}
