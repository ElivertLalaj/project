import { Component } from '@angular/core';
import { WetherService } from './wether.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseModel } from '../models/ResponseModel';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-wether',
  templateUrl: './wether.component.html',
  styleUrls: ['./wether.component.css']
})
export class WetherComponent {

  weatherForm: FormGroup
weatherData: Weather[]=[]
weatherShow: boolean = false
constructor(
        private weatherService: WetherService,
        private formBuilder: FormBuilder
){

  this.weatherForm = this.formBuilder.group({
    city: ['', Validators.required],
  })

}


ngOnInit(){

  this.getWeather()
}

getWeather(){
  
  this.weatherService.getWeather(this.weatherForm.value.city).subscribe((data) => {
    this.weatherData = [data]
  this.weatherShow = true

    console.log(this.weatherData)
    

  })
}

}
