import { Component } from '@angular/core';
import { WetherService } from './wether.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wether',
  templateUrl: './wether.component.html',
  styleUrls: ['./wether.component.css']
})
export class WetherComponent {

  weatherForm: FormGroup
//  city: string = '';
weather: any 
// weatherShow: boolean = false
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
    this.weather = data
  // this.weatherShow = true

    console.log(this.weather)
    

  })
}

}
