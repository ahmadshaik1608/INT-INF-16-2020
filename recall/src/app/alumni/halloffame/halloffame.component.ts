import { Component, OnInit } from '@angular/core';
import { Server } from 'http';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-halloffame',
  templateUrl: './halloffame.component.html',
  styleUrls: ['./halloffame.component.css']
})
export class HalloffameComponent implements OnInit {
allhof=[]
displayhof=[
  {},{}
]
loading=true
  hofimage="assets/images/download.jpg"
  constructor(private serve:MyserviceService) { 
   var count=0
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    console.log(year);
    
    serve.gethof().subscribe((data)=>{
     this.allhof=data['alumni']
     while(count<2 && year>2001 ){
       console.log(year);
       
     for(var each of this.allhof){
       if(each['hofyear']==year){
  
        this.displayhof[count]['yearno']=year
        this.displayhof[count]['member']=each
        count++
       }
     }
     year = year-1
    }
  console.log(this.displayhof);
  
    })
    this.loading=true
    
  }

  ngOnInit() {
    window.scrollTo({ top: 0});
  }

}
