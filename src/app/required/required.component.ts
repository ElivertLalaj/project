import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css']
})
export class RequiredComponent {
 
  appComponentVar: AppComponent;

  constructor(
    private appComponent: AppComponent
  ){
    this.appComponentVar = appComponent;
    appComponent.showSidebar = false
  }

  ngOnInit(){
    this.getRandomColor()
  }
  colors: any = [
    
  ] 

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    
    for (let i = 0; i < 6; i++) {
      let color = "#";
      
      
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      this.colors.push(color);
    }

    console.log(this.colors);
    return this.colors;
  }
 
  
}
