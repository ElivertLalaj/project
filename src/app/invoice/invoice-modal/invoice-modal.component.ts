import { Component} from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProductService } from 'src/app/product/product.service';
import { IProduct, Product } from 'src/app/models/product';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent {


  productSelectedId:number = 0;

  productName: string ='';
  
  productId : string = '';
  
  productList: Product[] = [];

  productService:ProductService

  sasia: number = 0


  
  data!: IProduct


  constructor(public modalRef: MdbModalRef<InvoiceModalComponent>,
     productService: ProductService) {
    this.productService = productService
  }
   
  ngOnInit(): void {
    this.getData()
    console.log("InvoiceModalComponent data: ")
    console.log(this.data)
    if (this.data) {
      this.sasia = this.data.quantity
      this.productSelectedId = this.data.product.id
    }
  }

  getData(){
    this.productService.getProducts<ResponseModel<Product[]>>().subscribe({
      next: (data: ResponseModel<Product[]>) => {
        this.productList = data.data;
        console.log("productService zzzzz")
        console.log(this.productList)
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
 
  }
  saveButtonClick() {
    const filteredProducts: Product[] = this.productList.filter((product) =>
      product.id == this.productSelectedId
    );
    if (filteredProducts.length > 0) {
      const dataToPassBack:IProduct = {
        product: filteredProducts[0],
        quantity: this.sasia,
        
      };
      this.modalRef.close(dataToPassBack);
    }else{
      this.modalRef.close();
    }
    

  }

}

  


