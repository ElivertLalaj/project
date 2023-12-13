export interface InvoiceRequest{
  invoice: InvoiceRequestInvoice
  products : InvoiceRequestProduct[]

}


export interface InvoiceRequestInvoice {

      created_at: string
      total: number
      created_by: number
    }

    export interface InvoiceRequestProduct{

      productName: string
      productCode: string
      releaseDate: string
      price: number
      description: string
      starRating: number
      imageUrl: string
      quantity: number
      invoice_id: number

    }

    export interface InvoiceResponseProduct{
      id: number
      productName: string
      productCode: string
      releaseDate: string
      price: number
      description: string
      starRating: number
      imageUrl: string
      quantity: number
      invoice_id: number

    }
   

export interface Invoice {
  id : number
   created_at: string
   total: number
   created_by: number
 }
