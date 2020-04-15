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
import {ViewallhalloffameComponent} from './viewallhalloffame/viewallhalloffame.component';
import {AlumniprofilesComponent} from './alumniprofiles/alumniprofiles.component';
import {GallaryComponent} from './gallary/gallary.component';
import {MyserviceGuard} from './myservice.guard';
import {CommunityComponent} from './community/community.component';
import {AlumnidirectoryComponent} from './alumnidirectory/alumnidirectory.component';
import {AlumnichaptersComponent} from './alumnichapters/alumnichapters.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { NotificationcenterComponent} from './notificationcenter/notificationcenter.component'


const appRoutes: Routes = [ 
  { path: 'updateProfile', component:  UpdateprofileComponent ,canActivate:[MyserviceGuard] },
  { path: 'home',  component: LoginAlumniComponent },
  { path: 'alumniTestimonials',  component: TestimonialComponent  },
  { path: 'contact-us',  component: ContactusComponent  },
  { path: 'registerWithUs',  component:RegisteralumniComponent  },
  { path: 'givingtoVidyanikethan',  component:GivingtousComponent },
  { path: 'HallofFame',  component:ViewallhalloffameComponent },
  { path: 'Alumni-Profiles',  component:AlumniprofilesComponent },
  { path: 'Gallery',  component:GallaryComponent },
  { path: 'Community',  component:CommunityComponent},
  { path: 'Alumni-Chapters',  component:AlumnichaptersComponent },
  { path: 'Alumni-Directory',  component:AlumnidirectoryComponent },
  { path: 'Notifications',  component:NotificationcenterComponent },
  { path: 'Birthdays',  component:BirthdaysComponent },
  { path: 'HomePage',  component:HomepageComponent },
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


