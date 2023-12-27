import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent {
  url = 'http://127.0.0.1:8000/api/cars';

  carForm: FormGroup;
  carId = 0;
  car?: Car;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private http: HttpClient,
    private formBuilder: FormBuilder,

  ) {

    
    this.carForm = this.formBuilder.group({
      name: ['', Validators.required],
      fuel: ['', Validators.required],
      door: [0, Validators.required ],
      size: ['', Validators.required],
      transmission: ['', Validators.required],

    });
  }

 

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
    if (this.carId != null) {
      this.getData(params['id']);
    }
    });
  }

  getData(carId: any) {
    this.carService.getCarsById<ResponseModel<Car>>(carId).subscribe({
      next: (data: ResponseModel<Car>) => {
        this.car = data.data;
        console.log("this.car" ,this.car)
        this.setData();
      },
      error(error: any) {
        console.error('error', error);
      },
    });
  }

  
  setData() {
    console.log("setData called")
    this.carForm.controls['name'].setValue(this.car?.name ?? '');
    this.carForm.controls['fuel'].setValue(this.car?.fuel ?? '');
    this.carForm.controls['door'].setValue(this.car?.door ?? 0);
    this.carForm.controls['size'].setValue(this.car?.size ?? '');
    this.carForm.controls['transmission'].setValue(this.car?.transmission ?? '');
  }

  onClickSave() {
    console.log('Form Valid:', this.carForm.valid);
    
  

    var addCar = {
      name: this.carForm.value.name,
      fuel: this.carForm.value.fuel,
      door: this.carForm.value.door,
      size: this.carForm.value.size,
      transmission: this.carForm.value.transmission,
    };

    console.log(addCar);
    
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
      this.carService.editSendData(addCar , this.carId).subscribe(
        (response) => {
          console.log('response from backend', response);
          this.router.navigate(['/car']);
        },
        (error) => {
          console.error('error in edit : ', error);
        }
      );
    }
  
}

}