import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-viewallhalloffame',
  templateUrl: './viewallhalloffame.component.html',
  styleUrls: ['./viewallhalloffame.component.css']
})
export class ViewallhalloffameComponent implements OnInit {
allhof=[]
loading=true
gotdata
  constructor(private serve:MyserviceService) { 
    serve.gethof().subscribe((data)=>{
        this.allhof=data['alumni']
        this.gotdata=true
        this.loading=false
    })
  }

  ngOnInit() {
  }

}
