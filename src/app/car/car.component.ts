import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from './car.service';
import { ResponseModel } from '../models/ResponseModel';
import { Car } from '../models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  constructor(
    private router: Router,
    private carService: CarService,
  ){}

  car : Car[] = []


  addCar(){
    this.router.navigate(['/addCar'])

  }


  editClicked(carId: any) {
    this.router.navigate(['/car/' + carId])

  }

  deleteClicked(carId: any){
    this.carService.deleteCar<ResponseModel<Car>>(carId).subscribe({
      next: (data: ResponseModel<Car>) => {
        this.getData()
      }
    })
  }


  ngOnInit(){
    this.getData()
  }

  getData(){
    this.carService.getCars<ResponseModel<Car[]>>().subscribe({
      next: (data: ResponseModel<Car[]>) => {
        this.car = data.data
      },
      error (error: any) {
        console.error("error in getData" , error)
      }
    })
  }


}
