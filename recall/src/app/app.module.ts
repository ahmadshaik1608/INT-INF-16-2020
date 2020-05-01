import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import {Serviceclass} from './testimonial/service'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TestimonialComponent } from './alumni/testimonial/testimonial.component';
import { LoginAlumniComponent } from './alumni/login-alumni/login-alumni.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {AppRoutingModule} from './app-routing.module';
import { UpdateprofileComponent } from './alumni/updateprofile/updateprofile.component';
import { ContactusComponent } from './alumni/contactus/contactus.component';
import { RegisteralumniComponent } from './alumni/registeralumni/registeralumni.component';
import { HalloffameComponent } from './alumni/halloffame/halloffame.component';
import { GivingtousComponent } from './alumni/givingtous/givingtous.component';
import { ViewallhalloffameComponent } from './alumni/viewallhalloffame/viewallhalloffame.component';
import { AlumniprofilesComponent } from './alumni/alumniprofiles/alumniprofiles.component';
import { GallaryComponent } from './alumni/gallary/gallary.component';
import {MyserviceService} from './myservice.service' ;
import {MyserviceGuard} from './myservice.guard';
import { AlumnichaptersComponent } from './alumni/alumnichapters/alumnichapters.component';
import { AlumnidirectoryComponent } from './alumni/alumnidirectory/alumnidirectory.component';
import {Routes, RouterModule} from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { HomepageComponent } from './alumni/homepage/homepage.component';
import { BirthdaysComponent } from './alumni/birthdays/birthdays.component';
import { NotificationcenterComponent } from './alumni/notificationcenter/notificationcenter.component';
import { EventpageComponent } from './alumni/eventpage/eventpage.component'
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChapterComponent } from './alumni/chapter/chapter.component';
import { JobstreetComponent } from './alumni/jobstreet/jobstreet.component';
import { AlumniComponent } from './alumni/alumni.component';
import { AdminComponent } from './admin/admin.component';
import { AlumniRoutingModule } from './alumni/alumni.routing';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin/admin-routing';
import { EventsComponent } from './admin/events/events.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { EditeventsComponent } from './admin/editevents/editevents.component';
import { AdminModule} from './admin/admin.module'
import {RoleGuardService} from './role-gaurd.service'


@NgModule({
  declarations: [
    AppComponent,
    TestimonialComponent,
    LoginAlumniComponent,
    AboutusComponent,
    UpdateprofileComponent,
    ContactusComponent,
    RegisteralumniComponent,
    HalloffameComponent,
    GivingtousComponent,
    GivingtousComponent,
    ViewallhalloffameComponent,
    AlumniprofilesComponent,
    GallaryComponent,
    AlumnichaptersComponent,
    AlumnidirectoryComponent,
    HomepageComponent,
    BirthdaysComponent,
    NotificationcenterComponent,
    EventpageComponent,
    ChapterComponent,
    JobstreetComponent,
    AlumniComponent,
    AdminComponent,
    DashboardComponent,
    EventsComponent,
    EditeventsComponent,
  ],
  imports: [
    // RouterModule.forChild(appRoutes),
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    MatTabsModule,
    AlumniRoutingModule,
    AdminRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AdminModule

  ],
  exports: [RouterModule],
  providers: [MyserviceService,MyserviceGuard,RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
