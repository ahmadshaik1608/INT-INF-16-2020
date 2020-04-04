import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Serviceclass} from './testimonial/service'
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
    AlumniprofilesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [Serviceclass,LoginServiceclass,RegisterServiceclass],
  bootstrap: [AppComponent]
})
export class AppModule { }
