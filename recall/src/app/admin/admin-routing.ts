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
import { AdminhalloffameComponent} from './adminhalloffame/adminhalloffame.component'



const appRoutes: Routes = [ 
 {  
     path:'Admin',
     component:AdminComponent,
     children: 
 [ 
  {path:'Dashboard',component:DashboardComponent},
  {path:'Events',component:EventsComponent},
  {path:'EditEvents',component:EditeventsComponent},
  {path:'AboutUs',component:AdminaboutusComponent},
  {path:'ContactUs',component:AdmincontactComponent},
  {path:'Testmonials',component:AdmintestmonialsComponent},
  {path:'Gallary',component:AdmingallaryComponent},
  {path:'Jobstreet',component:AdminjobstreetComponent},
  {path:'Alumni-Posts',component:AdminalmnijobstreetComponent},
  {path:'HallofFame',component:AdminhalloffameComponent},
  {path:'',component:AdminComponent}
]
},
{path:'Admin',component:AdminComponent}
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
export class AdminRoutingModule { }


