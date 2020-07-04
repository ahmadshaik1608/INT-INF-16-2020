import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-viewallhalloffame',
  templateUrl: './viewallhalloffame.component.html',
  styleUrls: ['./viewallhalloffame.component.css']
})
export class ViewallhalloffameComponent implements OnInit {
allhof=[]
  constructor(private serve:MyserviceService) { 
    serve.gethof().subscribe((data)=>{
        this.allhof=data['alumni']
        console.log(this.allhof);
        
    })
  }

  ngOnInit() {
  }

}
