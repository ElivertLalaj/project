import { Component } from '@angular/core';
import { StoreService } from './store.service';
import { Router } from '@angular/router';
import { Store } from '../models/store';
import { ResponseModel } from '../models/ResponseModel';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  sub!: Subscription
  store: Store[]=[]

constructor(
  private storeService: StoreService,
  private router: Router,
){}


editClicked(StoreId: any){
  this.router.navigate(["/store/"+ StoreId])
}

deleteClicked(StoreId: any){
  this.storeService.deleteStore<ResponseModel<Store>>(StoreId).subscribe({
    next: (data: ResponseModel<Store>) => {
      this.getData()
    },
    
  })
  
}

addStore(){
  this.router.navigate(["/addStore"])
}

ngOnInit() : void{
  this.getData()
}


getData(){
  this.sub = this.storeService.getStore<ResponseModel<Store[]>>().subscribe({
    next: (data: ResponseModel<Store[]>) => {
      console.log(data.data)
      this.store = data.data
    },
    error: (error: any)=> {
      console.error("Error fetching products: ", error)
    }
  })
}



}
