import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {

  productForm: FormGroup;



  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCode: [0,[ Validators.required, Validators.pattern("^[0-9]*$")]],
      price: [0,[ Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required],
      releaseDate: ['', Validators.required],
      starRating: [0.0,[ Validators.required, Validators.pattern("^[0-9]*$")]],
      imageUrl: ['', Validators.required],


    });
  }

  
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
    this.productForm.controls['productName'].setValue(this.product?.productName || '');
    this.productForm.controls['productCode'].setValue(this.product?.productCode || 0);
    this.productForm.controls['price'].setValue(this.product?.price || 0);
    this.productForm.controls['description'].setValue(this.product?.description || '');
    this.productForm.controls['releaseDate'].setValue(this.product?.releaseDate || '');
    this.productForm.controls['starRating'].setValue(this.product?.starRating || 0);
    this.productForm.controls['imageUrl'].setValue(this.product?.imageUrl || '');
  }

  onClickFinish() {

    console.log(this.productForm.value);


    var addStore = {
      productName: this.productForm.value.productName,
      productCode: this.productForm.value.productCode,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      releaseDate: this.productForm.value.releaseDate,
      starRating: this.productForm.value.starRating,
      imageUrl: this.productForm.value.imageUrl,
    };

    console.log(addStore);

    if (this.product?.id == null) {
      this.productService.addSendData(addStore).subscribe(
        (response) => {
          console.log('Response from bacend:', response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('error: ', error);
        }
      );
    } else {
      this.productService.editSendData(addStore , this.productId).subscribe(
        (response) => {
          console.log('Response from bacend:', response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('error: ', error);
        }
      );
    }
  }

 
}
