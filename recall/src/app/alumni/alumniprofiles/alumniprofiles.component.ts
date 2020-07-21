import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-alumniprofiles',
  templateUrl: './alumniprofiles.component.html',
  styleUrls: ['./alumniprofiles.component.css']
})
export class AlumniprofilesComponent implements OnInit {

  constructor(private serve:MyserviceService) {
    serve.getProfiles().subscribe(data=>{
      this.profiles=data
    })
   }
  profiles
  ngOnInit() {
  }

}
