import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialComponent } from './alumni/testimonial/testimonial.component';
import { LoginAlumniComponent } from './alumni/login-alumni/login-alumni.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateprofileComponent} from './alumni/updateprofile/updateprofile.component';
import {ContactusComponent} from './alumni/contactus/contactus.component';
import {RegisteralumniComponent } from './alumni/registeralumni/registeralumni.component';
import {GivingtousComponent} from './alumni/givingtous/givingtous.component';
import {ViewallhalloffameComponent} from './alumni/viewallhalloffame/viewallhalloffame.component';
import {AlumniprofilesComponent} from './alumni/alumniprofiles/alumniprofiles.component';
import {GallaryComponent} from './alumni/gallary/gallary.component';
import {MyserviceGuard} from './myservice.guard';
import {AlumnidirectoryComponent} from './alumni/alumnidirectory/alumnidirectory.component';
import {AlumnichaptersComponent} from './alumni/alumnichapters/alumnichapters.component';
import { HomepageComponent } from './alumni/homepage/homepage.component';
import { BirthdaysComponent } from './alumni/birthdays/birthdays.component';
import { NotificationcenterComponent} from './alumni/notificationcenter/notificationcenter.component'
import { EventpageComponent } from './alumni/eventpage/eventpage.component';
import { ChapterComponent } from './alumni/chapter/chapter.component';
import { JobstreetComponent } from './alumni/jobstreet/jobstreet.component'
import {AlumniComponent } from './alumni/alumni.component'

const appRoutes: Routes = [ 
  // { path: 'updateProfile', component:  UpdateprofileComponent ,canActivate:[MyserviceGuard] },
  // { path: 'home',  component: LoginAlumniComponent },
  // { path: 'alumniTestimonials',  component: TestimonialComponent  },
  // { path: 'contact-us',  component: ContactusComponent  },
  // { path: 'registerWithUs',  component:RegisteralumniComponent  },
  // { path: 'Events',  component:GivingtousComponent },
  // { path: 'HallofFame',  component:ViewallhalloffameComponent },
  // { path: 'Alumni-Profiles',  component:AlumniprofilesComponent },
  // { path: 'Gallery',  component:GallaryComponent },
  // { path: 'Alumni-Chapters',  component:AlumnichaptersComponent },
  // { path: 'Alumni-Directory',  component:AlumnidirectoryComponent },
  // { path: 'Notifications',  component:NotificationcenterComponent },
  // { path: 'Birthdays',  component:BirthdaysComponent },
  // { path: 'HomePage',  component:HomepageComponent },
  // { path: 'RegisterEvent/:id',  component:EventpageComponent },
  // { path: 'Chapter/:name',  component:ChapterComponent },
  // { path: 'JobStreet',  component:JobstreetComponent },
  {path:'',redirectTo:'Alumni',pathMatch:'full'}

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{
      scrollPositionRestoration: 'enabled'
    }),
    CommonModule
  ],
  exports:[RouterModule],   
  declarations: []
})
export class AppRoutingModule { }


