import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { RouterModule, Routes } from '@angular/router';
import {MyserviceGuard} from '../myservice.guard';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent} from './events/events.component';
import { EditeventsComponent } from './editevents/editevents.component'
import {  AdminaboutusComponent} from './adminaboutus/adminaboutus.component'
import {AdmincontactComponent } from './admincontact/admincontact.component';
import { AdmintestmonialsComponent } from './admintestmonials/admintestmonials.component';
import { from } from 'rxjs';
import { AdmingallaryComponent } from './admingallary/admingallary.component';
import {AdminjobstreetComponent} from './adminjobstreet/adminjobstreet.component'
import { AdminalmnijobstreetComponent } from './adminalmnijobstreet/adminalmnijobstreet.component'
import { AdminhalloffameComponent} from './adminhalloffame/adminhalloffame.component';
import { AdminalumnichaptersComponent } from "./adminalumnichapters/adminalumnichapters.component";
import { MailcenterComponent } from "./mailcenter/mailcenter.component"
import { SettingsComponent } from "./settings/settings.component"
import { RoleGuardService as RoleGuard } from '../role-gaurd.service'


const appRoutes: Routes = [ 
 {  
     path:'Admin',
     component:AdminComponent ,
     children: 
 [ 
  {path:'Dashboard',component:DashboardComponent, canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } 
},
  {path:'Events',component:EventsComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'EditEvents',component:EditeventsComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'AboutUs',component:AdminaboutusComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'ContactUs',component:AdmincontactComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'Testmonials',component:AdmintestmonialsComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'Gallary',component:AdmingallaryComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'JobStreet',component:AdminjobstreetComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'Alumni-Posts',component:AdminalmnijobstreetComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'HallofFame',component:AdminhalloffameComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'Chapters',component:AdminalumnichaptersComponent,canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },
  {path:'MailCenter',component:MailcenterComponent,canActivate: [MyserviceGuard], 
    data: { 
        expectedRole: ['Admin']
      } },
  {path:'Settings',component:SettingsComponent,canActivate: [MyserviceGuard], 
   data: { 
      expectedRole: ['Admin']
     } },
  {path:'',  pathMatch: 'full',redirectTo:'Alumni/Dashboard',canActivate: [MyserviceGuard], 
  data: { 
      expectedRole: ['Admin']
    } },

]
},

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
export class AdminRoutingModule { }


