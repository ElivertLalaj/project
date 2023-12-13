import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
})
export class TripEditComponent {
  url = 'http://127.0.0.1:8000/api/trips/';

  constructor(
    private http: HttpClient,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  start: number = 0;
  end: number = 0;
  description: string = '';
  car_id: number = 0;
  name: string = '';
  trip?: Trip;
  tripId = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tripId = params['id'];
      if (this.tripId != null){ 
      this.getData(params['id']);
      }
    });
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
    this.name = this.trip?.name ?? '';
    this.start = this.trip?.start ?? 0;
    this.end = this.trip?.end ?? 0;
    this.description = this.trip?.description ?? '';
    this.car_id = this.trip?.car_id ?? 0;
  }

  onClickSave() {
    var addTrip = {
      name: this.name,
      start: this.start,
      end: this.end,
      description: this.description,
      car_id: this.car_id,
    };
    if (this.trip?.id == null) {
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
      this.tripService.editSendData(addTrip).subscribe(
        (response) => {
          console.log('Response from backend', response);
          this.router.navigate(['/trip']);
        },
        (error) => {
          console.error('error', error);
        }
      );
    }
  }
}
