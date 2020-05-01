import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LoginAlumniComponent } from './login-alumni/login-alumni.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateprofileComponent} from './updateprofile/updateprofile.component';
import {ContactusComponent} from './contactus/contactus.component';
import {RegisteralumniComponent } from './registeralumni/registeralumni.component';
import {GivingtousComponent} from './givingtous/givingtous.component';
import {ViewallhalloffameComponent} from './viewallhalloffame/viewallhalloffame.component';
import {AlumniprofilesComponent} from './alumniprofiles/alumniprofiles.component';
import {GallaryComponent} from './gallary/gallary.component';
import {MyserviceGuard} from '../myservice.guard';
import {AlumnidirectoryComponent} from './alumnidirectory/alumnidirectory.component';
import {AlumnichaptersComponent} from './alumnichapters/alumnichapters.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { NotificationcenterComponent} from './notificationcenter/notificationcenter.component'
import { EventpageComponent } from './eventpage/eventpage.component';
import { ChapterComponent } from './chapter/chapter.component';
import { JobstreetComponent } from './jobstreet/jobstreet.component'
import {AlumniComponent } from './alumni.component'
import { AdminComponent } from 'app/admin/admin.component';


const appRoutes: Routes = [ 
 {  
     path:'Alumni',
     component:AlumniComponent,
     children: 
 [ 
  { path: 'updateProfile', component:  UpdateprofileComponent ,canActivate:[MyserviceGuard],  data: { 
    expectedRole: ['Alumni']
  }  },
  { path: 'home',  component: LoginAlumniComponent },
  { path: 'alumniTestimonials',  component: TestimonialComponent  },
  { path: 'contact-us',  component: ContactusComponent  },
  { path: 'registerWithUs',  component:RegisteralumniComponent  },
  { path: 'Events',  component:GivingtousComponent },
  { path: 'HallofFame',  component:ViewallhalloffameComponent },
  { path: 'Alumni-Profiles',  component:AlumniprofilesComponent },
  { path: 'Gallery',  component:GallaryComponent },
  { path: 'Alumni-Chapters',  component:AlumnichaptersComponent },
  { path: 'Alumni-Directory',  component:AlumnidirectoryComponent },
  { path: 'Notifications',  component:NotificationcenterComponent,canActivate:[MyserviceGuard] ,  data: { 
    expectedRole: ['Alumni']
  }  },
  { path: 'Birthdays',  component:BirthdaysComponent ,canActivate:[MyserviceGuard],  data: { 
    expectedRole: ['Alumni']
  }  },
  { path: 'HomePage',  component:HomepageComponent,canActivate:[MyserviceGuard] ,  data: { 
    expectedRole: ['Alumni']
  }  },
  { path: 'RegisterEvent/:id',  component:EventpageComponent },
  { path: 'Chapter/:name',  component:ChapterComponent },
  { path: 'JobStreet',  component:JobstreetComponent,canActivate:[MyserviceGuard] ,  data: { 
    expectedRole: ['Alumni']
  }  },
  {path:'',component:AboutusComponent}
]
},
{path:'Admin',component:AdminComponent,canActivate:[MyserviceGuard], data: { 
  expectedRole: ['Admin']
} 
}
//   { path: '',  component: AlumniComponent}

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
export class AlumniRoutingModule { }


