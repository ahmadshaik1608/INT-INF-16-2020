import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { RouterModule, Routes } from '@angular/router';
import {MyserviceGuard} from '../myservice.guard';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent} from './events/events.component';
import {GallaryComponent } from './gallary/gallary.component'
import { EditeventsComponent } from './editevents/editevents.component'
import {  AdminaboutusComponent} from './adminaboutus/adminaboutus.component'



const appRoutes: Routes = [ 
 {  
     path:'Admin',
     component:AdminComponent,
     children: 
 [ 
  {path:'Dashboard',component:DashboardComponent},
  {path:'Events',component:EventsComponent},
  {path:'Gallary',component:GallaryComponent},
  {path:'EditEvents',component:EditeventsComponent},
  {path:'AboutUs',component:AdminaboutusComponent},
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


