import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/car/car.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
})
export class TripEditComponent {

  tripForm: FormGroup;
  trip?: Trip;
  tripId = 0;
  car: Car[] =[]

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
  ) {
    this.tripForm = this.formBuilder.group({
      name: ['', Validators.required],
      start: [0, Validators.required],
      end: [0, Validators.required],
      description: ['', Validators.required],
      car_id: [0, Validators.required],
      id: 0
    });
  
  }

 
  ngOnInit() {
   
    this.route.params.subscribe((params) => {
      this.tripId = params['id'];
      if (this.tripId != null){ 
      this.getData(params['id']);
      }
    });
    this.getCar()

    
  }

  getCar(){
    this.carService.getCars<ResponseModel<Car[]>>().subscribe({
      next: (data: ResponseModel<Car[]>) => {
        this.car = data.data
       
      }
    })
  }

  getData(tripId: String) {
    this.tripService.getTripById<ResponseModel<Trip>>(tripId).subscribe({
      next: (data: ResponseModel<Trip>) => {
        this.trip = data.data;
        this.setData();
      },
      error: (error: any) => {
        console.error('error fetching stores: ', error);
      },
    });
  }
  

  setData() {
    this.tripForm.controls['name'].setValue(this.trip?.name || '')
    this.tripForm.controls['start'].setValue(this.trip?.start || 0)
    this.tripForm.controls['end'].setValue(this.trip?.end || 0)
    this.tripForm.controls['description'].setValue(this.trip?.description || '')
    this.tripForm.controls['car_id'].setValue(this.trip?.car_id || 0)

   
  }

  onClickSave() {

    if(this.tripForm.valid){
      var addTrip = {
        id: this.trip?.id,
        name: this.tripForm.value.name,
        start: this.tripForm.value.start,
        end: this.tripForm.value.end,
        description: this.tripForm.value.description,
        car_id: this.tripForm.value.car_id,
      };
      console.log(addTrip)
    if (this.trip?.id == null) {
      console.log("addd")
      this.tripService.addSendData(addTrip).subscribe(
        (response) => {
          console.log('Response from backend', response);
          this.router.navigate(['/trip']);
        },
        (error) => {
          console.error('error', error);
        }
      );
    } else {
      console.log("Edit")
      this.tripService.editSendData(addTrip , this.tripId).subscribe(
        (response) => {
          console.log('Response from backend', response);
          this.router.navigate(['/trip']);
        },
        (error) => {
          console.error('error in edit', error);
        }
      );
    }
  } else{
    alert("error")
  }
  }
}
