import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { ResponseModel } from 'src/app/models/ResponseModel';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent {
  url = 'http://127.0.0.1:8000/api/cars';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private http: HttpClient
  ) {}

  fuel: string = '';
  door: number = 0;
  name: string = '';
  transmission: string = '';
  size: string = '';
  id: number = 0;
  carId = 0;
  car?: Car;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
    if (this.car?.id != null) {
      this.getData(params['id']);
    }
    });
  }

  getData(carId: any) {
    this.carService.getCarsById<ResponseModel<Car>>(carId).subscribe({
      next: (data: ResponseModel<Car>) => {
        this.car = data.data;
        this.setData();
      },
      error(error: any) {
        console.error('error', error);
      },
    });
  }

  setData() {
    this.name = this.car?.name ?? '';
    this.fuel = this.car?.fuel ?? '';
    this.door = this.car?.door ?? 0;
    this.size = this.car?.size ?? '';
    this.transmission = this.car?.transmission ?? '';
  }

  onClickSave() {
    var addCar = {
      name: this.name,
      fuel: this.fuel,
      door: this.door,
      size: this.size,
      transmission: this.transmission,
    };
    if (this.car?.id == null) {
      this.carService.addSendData(addCar).subscribe(
        (response) => {
          console.log('response from backend', response);
          this.router.navigate(['/car']);
        },
        (error) => {
          console.error('error : ', error);
        }
      );
    } else {
      this.carService.editSendData(addCar).subscribe(
        (response) => {
          console.log('response from backend', response);
          this.router.navigate(['/car']);
        },
        (error) => {
          console.error('error : ', error);
        }
      );
    }
  }
}
