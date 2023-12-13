import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  description: string = '';
  productCode: string = '';
  releaseDate: string = '';
  imageUrl: string = '';
  price: number = 0;
  productName: string = '';
  starRating: number = 0;
  id: number = 0;
  productId = 0;
  product?: Product;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      console.log("productId:" + this.productId)
      if(this.productId != null){
        this.getData(params['id']);
      }
    });
  }

  getData(productId: any) {
    this.productService
      .getProductById<ResponseModel<Product>>(productId)
      .subscribe({
        next: (data: ResponseModel<Product>) => {
          this.product = data.data;
          this.setData();
        },
        error: (error: any) => {
          console.error('error fetching stores: ', error);
        },
      });
  }

  setData() {
    console.log('setData called');
    this.productName = this.product?.productName ?? '';
    this.productCode = this.product?.productCode ?? '';
    this.price = this.product?.price ?? 0;
    this.description = this.product?.description ?? '';
    this.releaseDate = this.product?.releaseDate ?? '';
    this.starRating = this.product?.starRating ?? 0;
    this.imageUrl = this.product?.imageUrl ?? '';
  }

  onClickFinish() {
    var addStore = {
      productName: this.productName,
      productCode: this.productCode,
      price: this.price,
      description: this.description,
      releaseDate: this.releaseDate,
      starRating: this.starRating,
      imageUrl: this.imageUrl,
    };

    if (this.product?.id == null) {
      this.productService.addSendData(addStore).subscribe(
        (response) => {
          console.log('Response from bacend:', response);
          this.router.navigate(['./products']);
        },
        (error) => {
          console.error('error: ', error);
        }
      );
    } else {
      this.productService.editSendData(addStore).subscribe(
        (response) => {
          console.log('Response from bacend:', response);
          this.router.navigate(['./products']);
        },
        (error) => {
          console.error('error: ', error);
        }
      );
    }
  }
}
