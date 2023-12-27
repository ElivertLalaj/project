import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../store.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from 'src/app/models/store';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css'],
})
export class StoreEditComponent {

  storeForm: FormGroup

  constructor(
    private router: Router,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,

  ) {

    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      lng: [0,[ Validators.required, Validators.pattern("^[0-9]*$")]],
      lat: [0,[ Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required],
     


    });
  }

 
  store?: Store;
  StoreId = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.StoreId = params['id'];
      if (this.StoreId != null) {
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
    this.storeForm.controls['name'].setValue(this.store?.name || '');
    this.storeForm.controls['lat'].setValue(this.store?.lat || 0);
    this.storeForm.controls['lng'].setValue(this.store?.lng || 0);
    this.storeForm.controls['description'].setValue(this.store?.description || '');
  
  }

  onClickFinish() {
    console.log(this.storeForm.valid) 

    if (this.storeForm.valid) {

      
      var addStore = {
        name: this.storeForm.value.name,
        description: this.storeForm.value.description,
        lng: this.storeForm.value.lng,
        lat: this.storeForm.value.lat,
      };

      if (this.store?.id == null) {
        this.storeService.addSendData(addStore).subscribe((response) => {
          console.log("Response from backend: ", response)
          this.router.navigate(["/store"])
        },
          (error) => {
            console.error("error", error)
          },
        );
      } else {

        this.storeService.editSendData(addStore , this.StoreId).subscribe(
          (response) => {
            console.log('Response from bacend:', response);
            this.router.navigate(['./store']);
          },
          (error) => {
            console.error('error: ', error);
          }
        );
      }
    } else {
      alert('Please fill in all inputs.');
    }
  }
}
