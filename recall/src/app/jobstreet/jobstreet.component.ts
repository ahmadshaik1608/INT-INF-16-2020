import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-jobstreet',
  templateUrl: './jobstreet.component.html',
  styleUrls: ['./jobstreet.component.css']
})
export class JobstreetComponent implements OnInit {

  constructor(private serve:MyserviceService) { }
postAjob=true
newJob= {

}
  ngOnInit(): void {
  }
  degrees: string[] = ['Btech', 'Mtech', 'MCA', 'PhD'];
jobs=[
  {'name':'Hotstar'},
  {'name':'Dell'},
  {'name':'Harlet Packard'}
]
invalid
formsubmit(user: NgForm)
{
  if(user.valid){
     var data=user.value
    for (let varable of Object.keys( data))
    {
        this.newJob[varable]=data[varable].trim()
    }
    this.newJob['userId']=localStorage.getItem('token')
    this.serve.postjob(data).subscribe(data=>{
        console.log(data);
        
    })
}
  else{
    this.invalid=true
    console.log("invalid");
  }
    
  
}
}
