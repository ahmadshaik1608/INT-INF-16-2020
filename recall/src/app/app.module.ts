import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import {Serviceclass} from './testimonial/service'
import { HttpClientModule } from '@angular/common/http';
import {LoginServiceclass} from './login-alumni/service'
import { AppComponent } from './app.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LoginAlumniComponent } from './login-alumni/login-alumni.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {AppRoutingModule} from './app-routing.module';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { RegisterServiceclass } from './registeralumni/registerservice'
import { ContactusComponent } from './contactus/contactus.component';
import { RegisteralumniComponent } from './registeralumni/registeralumni.component';
import { HalloffameComponent } from './halloffame/halloffame.component';
import { GivingtousComponent } from './givingtous/givingtous.component';
import { ViewallhalloffameComponent } from './viewallhalloffame/viewallhalloffame.component';
import { AlumniprofilesComponent } from './alumniprofiles/alumniprofiles.component';
import { GallaryComponent } from './gallary/gallary.component';
import {MyserviceService} from './myservice.service' ;

@NgModule({
  declarations: [
    AppComponent,
    TestimonialComponent,
    LoginAlumniComponent,
    AboutusComponent,
    UpdateprofileComponent,
    ContactusComponent,
    RegisteralumniComponent,
    HalloffameComponent,
    GivingtousComponent,
    GivingtousComponent,
    ViewallhalloffameComponent,
    AlumniprofilesComponent,
    GallaryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginServiceclass,RegisterServiceclass,MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
