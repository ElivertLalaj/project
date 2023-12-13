import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from 'src/app/models/store';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css'],
})
export class StoreEditComponent {
  private url = 'http://127.0.0.1:8000/api/store/';

  constructor(
    private router: Router,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  name: string = '';
  lng: number = 0;
  lat: number = 0;
  description: String = '';
  store?: Store;
  StoreId = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.StoreId = params['id'];
      if(this.StoreId != null){
        this.getData(params['id']);
      }

    });
  }

  getData(StoreId: String) {
    this.storeService.getStoreById<ResponseModel<Store>>(StoreId).subscribe({
      next: (data: ResponseModel<Store>) => {
        this.store = data.data;
        this.setData();
      },
      error: (error: any) => {
        console.error('error fetching stores: ', error);
      },
    });
  }

  setData() {
    console.log('setData called');
    this.name = this.store?.name ?? '';
    this.lat = this.store?.lat ?? 0;
    this.lng = this.store?.lng ?? 0;
    this.description = this.store?.description ?? '';
  }

  onClickFinish() {
    var addStore = {
      name: this.name,
      description: this.description,
      lng: this.lng,
      lat: this.lat,
    };

    if(this.store?.id == null){
      this.storeService.addSendData(addStore).subscribe((response) => {
        console.log("Response from backend: " , response )
        this.router.navigate(["/store"])
      },
      (error) => {
        console.error("error" ,error)
      },
      ) 
    }else {

    this.storeService.editSendData(addStore).subscribe(
      (response) => {
        console.log('Response from bacend:', response);
        this.router.navigate(['./store']);
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }
}
}
