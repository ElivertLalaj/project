import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InvoiceService } from '../invoice.service';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import {
  Invoice,
  InvoiceRequest,
  InvoiceRequestInvoice,
  InvoiceRequestProduct,
  InvoiceResponseProduct,
} from 'src/app/models/invoice';
import { HttpClient } from '@angular/common/http';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { IProduct, Product } from 'src/app/models/product';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent {
  product: InvoiceRequest[] = [];

  products: IProduct[] = [];

  isEdit = false;
  Invoice: Invoice[] = [];

  invoice?: InvoiceRequest;

  productList: IProduct[] = [];

  modalRef: MdbModalRef<InvoiceModalComponent> | null = null;

  sub!: Subscription;

  total: number = 0;

  quantity: number = 0;
  invoiceId: string = '';

  constructor(
    private modalService: MdbModalService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.invoiceId = params['id'];

      if (this.invoiceId) {
        this.getInvoiceProductById(this.invoiceId);
      }
    });
  }

  openModal() {
    this.isEdit = false;

    this.modalRef = this.modalService.open(InvoiceModalComponent);

    this.modalRef.onClose.subscribe((result: IProduct) => {
      if (result) {
        this.productList.push(result);

        this.total = 0;
        this.quantity = 0;

        for (const item of this.productList) {
          console.log(item);
          this.total = this.total + item.product.price * item.quantity;
          console.log(item.product.price * item.quantity);
          console.log(this.total);
          this.quantity += item.quantity;
          console.log(this.quantity);
        }
        console.log(this.isEdit);
      }
    });
  }

  deleteProduct(index: number) {
    console.log('deleteProduct ' + index);

    if (index >= 0 && index < this.productList.length) {
      this.productList.splice(index, 1);
    }

    console.log(this.productList);
  }
  editProduct(index: number) {
    this.isEdit = true;
    console.log('this.productList[index]');
    console.log(this.productList[index]);

    this.modalRef = this.modalService.open(InvoiceModalComponent);
    this.modalRef.component.data = this.productList[index];

    this.modalRef.onClose.subscribe((result: IProduct) => {
      if (result) {
        console.log('zzzzzzz');
        console.log(result);
        this.productList[index] = result;
        console.log(this.isEdit);
      }
    });
  }





  
  getTotalPrice(product: IProduct): number {
    return product.product.price * product.quantity;
  }

  saveButtonClicked(id: string) {
    let invoice: InvoiceRequestProduct[] = [];

    for (const item of this.productList) {
      console.log(item);
      var datainvoiceRequestProduct: InvoiceRequestProduct = {
        productName: item.product.productName,
        releaseDate: item.product.releaseDate,
        price: item.product.price,
        description: item.product.description,
        starRating: item.product.starRating,
        imageUrl: item.product.imageUrl,
        quantity: item.quantity,
        invoice_id: 0,
        productCode: item.product.productCode,
      };
      invoice.push(datainvoiceRequestProduct);
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    var dataRequestInvoice: InvoiceRequestInvoice = {
      created_at: today.toLocaleDateString('en-US', options),
      total: this.total,
      created_by: 1,
    };

    var dataRequest: InvoiceRequest = {
      invoice: dataRequestInvoice,
      products: invoice,
    };

    if (this.invoiceId) {
      console.log('dataRequest');
      console.log(dataRequest);
      this.editInvoice(dataRequest);
    } else {
      console.log('saveInvoice');

      this.saveInvoice(dataRequest);
    }
  }
  

  getInvoiceProductById(invoiceId: string) {
    this.invoiceService
      .getInvoiceProductById<ResponseModel<InvoiceResponseProduct[]>>(invoiceId)
      .subscribe({
        next: (data: ResponseModel<InvoiceResponseProduct[]>) => {
          console.log(this.getInvoiceProductById);
          for (const item of data.data) {
            this.productList.push(this.mapObjects(item));
          }
        },
        error: (error: any) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  mapObjects(source: InvoiceResponseProduct): IProduct {
    return {
      quantity: source.quantity,
      product: {
        id: source.id,
        productName: source.productName,
        releaseDate: source.releaseDate,
        price: source.price,
        description: source.description,
        starRating: source.starRating,
        imageUrl: source.imageUrl,
        productCode: source.productCode,
      },
    };
  }
  saveInvoice(data: InvoiceRequest) {
    this.invoiceService.saveInvoice<ResponseModel<Invoice>>(data).subscribe({
      next: (data: ResponseModel<Invoice>) => {
        if (data.success) {
          this.router.navigate(['./invoice']);
        } else {
          console.log(data.message);
        }
      },
      error: (error: any) => {
        console.error('Error saving invoice:', error);
      },
    });
  }

  editInvoice(data: InvoiceRequest) {
    this.invoiceService
      .editInvoice<ResponseModel<Invoice>>(this.invoiceId, data)
      .subscribe({
        next: (data: ResponseModel<Invoice>) => {
          if (data.success) {
            // this.router.navigate(['/invoice']);
          } else {
            console.log(data.message);
          }
        },
        error: (error: any) => {
          console.error('Error deleting edit:', error);
        },
      });
  }

}
