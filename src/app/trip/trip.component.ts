import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from './trip.service';
import { ResponseModel } from '../models/ResponseModel';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {

  constructor(
    private router: Router,
    private tripService: TripService,
  ){}


  trip: Trip[] =[]


  addStore(){
    this.router.navigate(["/addTrip"])

  }


  editClicked(tripId: any){

    this.router.navigate(["/trip/" + tripId])


  }


  deleteClicked(tripId: any){
    this.tripService.deleteTrip<ResponseModel<Trip>>(tripId).subscribe({
      next: (data: ResponseModel<Trip>) => {
        this.getData()
      }
    })

  }

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.tripService.getTriip<ResponseModel<Trip[]>>().subscribe({
      next: (data: ResponseModel<Trip[]>) =>{
        this.trip = data.data
      },
      error (error: any) {
        console.error("error" , error)
      }
    })
  }

}
