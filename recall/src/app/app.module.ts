import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Serviceclass} from './testimonial/service'
import {LoginServiceclass} from './login-alumni/service'
import { AppComponent } from './app.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LoginAlumniComponent } from './login-alumni/login-alumni.component';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
  declarations: [
    AppComponent,
    TestimonialComponent,
    LoginAlumniComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Serviceclass,LoginServiceclass],
  bootstrap: [AppComponent]
})
export class AppModule { }
