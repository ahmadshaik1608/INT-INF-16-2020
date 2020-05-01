import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [ 
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


