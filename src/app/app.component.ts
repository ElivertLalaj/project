import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {




  showSidebar: boolean = true
  
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document:Document, 
    private render:Renderer2
  ){}



  ngOnInit() {
      this.render.addClass(this.document.body,"lightTheme")
      this.render.addClass(this.document.body,"orangeTheme")
      this.render.addClass(this.document.body,"darkTheme")


  }



  changeTheme(themeValue: String){
    this.render.removeClass(this.document.body,"lightTheme")
    this.render.removeClass(this.document.body,"darkTheme")
    this.render.removeClass(this.document.body,"orangeTheme")

    if(themeValue == 'light'){
      this.render.addClass(this.document.body,"lightTheme")
    }
    else if(themeValue == 'orange'){
      this.render.addClass(this.document.body,"orangeTheme")
    }
    else if(themeValue == 'dark'){
      this.render.addClass(this.document.body,"darkTheme")
    }
    
  }

  Logout(){


  localStorage.removeItem("token");
  this.router.navigate(["./login"])

  }

}
