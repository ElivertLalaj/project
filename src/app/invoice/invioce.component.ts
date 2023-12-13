import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../models/invoice';
import { ResponseModel } from '../models/ResponseModel';

@Component({
  selector: 'app-invioce',
  templateUrl: './invioce.component.html',
  styleUrls: ['./invioce.component.css']
})
export class InvioceComponent {


  invoice: Invoice[] =[]

  constructor(
    private router: Router,
    private invoiceService: InvoiceService
  ){}


addInvoice(){
  this.router.navigate(["/invoiceList"])
}


editClicked(invoiceId : number){
  this.router.navigate(["/invoice/" + invoiceId])

}


deleteClicked(invoiceId : any){
  this.invoiceService.deleteInvoice<ResponseModel<Invoice>>(invoiceId).subscribe({
    next: (data: ResponseModel<Invoice>) => {
      this.getData()
    }
  })
}


ngOnInit(){
  this.getData()
}

getData(){
  this.invoiceService.getInvoice<ResponseModel<Invoice[]>>().subscribe({
    next: (data: ResponseModel<Invoice[]>) =>
    this.invoice = data.data
  })
  
}
error (error: any) {
  console.error("error" , error)
}




}
