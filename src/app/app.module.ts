import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from './store/store.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthGuard } from './login/AuthGuard';
import { SharedModule } from './shared.module';
import { ProductModule } from './product/product.module';
import { CarModule } from './car/car.module';
import { TripModule } from './trip/trip.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { InvoiceModalComponent } from './invoice/invoice-modal/invoice-modal.component';
import { RequiredModule } from './required/required.module';





@NgModule({
  declarations: [
    AppComponent,
    InvoiceModalComponent
  
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StoreModule,
    MatSidenavModule,
    ProductModule,
    CarModule,
    TripModule,
    InvoiceModule,
    MdbModalModule,
    RequiredModule,
    ModalModule.forRoot(),
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
