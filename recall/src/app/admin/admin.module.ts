import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminaboutusComponent } from './adminaboutus/adminaboutus.component';
import { AdmincontactComponent} from './admincontact/admincontact.component';
import { AdmintestmonialsComponent } from './admintestmonials/admintestmonials.component';
import { AdmingallaryComponent } from './admingallary/admingallary.component';
import { AdminjobstreetComponent } from './adminjobstreet/adminjobstreet.component';
import { AdminalmnijobstreetComponent } from './adminalmnijobstreet/adminalmnijobstreet.component';
import { AdminhalloffameComponent } from './adminhalloffame/adminhalloffame.component';
import { AdminalumnichaptersComponent } from './adminalumnichapters/adminalumnichapters.component';
import { MailcenterComponent } from './mailcenter/mailcenter.component';
import { SettingsComponent } from './settings/settings.component';
 



@NgModule({
  declarations: [AdminaboutusComponent,AdmincontactComponent, AdmintestmonialsComponent, AdmingallaryComponent, AdminjobstreetComponent, AdminalmnijobstreetComponent, AdminhalloffameComponent, AdminalumnichaptersComponent, MailcenterComponent, SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
