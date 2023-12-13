export interface Product {
    description: string,
    productCode: string
    releaseDate:  string
    imageUrl: string
    price: number
    productName: string,
    starRating: number,
    id: number
}

export interface IProduct {
    product : Product 
    quantity : number
}