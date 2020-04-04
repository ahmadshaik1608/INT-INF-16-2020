import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LoginAlumniComponent } from './login-alumni/login-alumni.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateprofileComponent} from './updateprofile/updateprofile.component';
import {ContactusComponent} from './contactus/contactus.component';
import {RegisteralumniComponent } from './registeralumni/registeralumni.component';
import {GivingtousComponent} from './givingtous/givingtous.component';
import {ViewallhalloffameComponent} from './viewallhalloffame/viewallhalloffame.component'


const appRoutes: Routes = [ 
  { path: 'updateProfile', component:  UpdateprofileComponent },
  { path: 'home',  component: LoginAlumniComponent },
  { path: 'alumniTestimonials',  component: TestimonialComponent  },
  { path: 'contact-us',  component: ContactusComponent  },
  { path: 'registerWithUs',  component:RegisteralumniComponent  },
  { path: 'givingtoVidyanikethan',  component:GivingtousComponent },
  { path: 'HallofFame',  component:ViewallhalloffameComponent },
  { path: '',  component: AboutusComponent }

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports:[RouterModule],   
  declarations: []
})
export class AppRoutingModule { }


