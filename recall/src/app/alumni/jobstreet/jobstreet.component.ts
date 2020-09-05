import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MyserviceService } from 'app/myservice.service';
import * as moment from 'moment';
import { data } from 'jquery';

@Component({
  selector: 'app-jobstreet',
  templateUrl: './jobstreet.component.html',
  styleUrls: ['./jobstreet.component.css']
})
export class JobstreetComponent implements OnInit {

  loading=true
  gotdata=false
  today=new Date();

  now = moment();
  minDate = this.now.format('YYYY-MM-DD');
  dateError=false
  constructor(private serve:MyserviceService) {
    this.serve.getAlljobs().subscribe((responsejobs)=>{
      console.log(responsejobs);
      
      for(let i of responsejobs['alljobs']){
           this.jobs.push(i[0])
           if(i[0]['userId']==localStorage.getItem('token')){
             this.yourjobs.push(i[0])
           }
      }
      this.dupjobs=this.jobs
      this.loading=false
      this.gotdata=true
      // console.log(this.yourjobs);
     })
   }
postAjob
posted
jobs=[]
yourjobs=[]
dupjobs=[]

newJob= {

}
  ngOnInit(): void {
   
  }
  degrees: string[] = ['Btech', 'Mtech', 'MCA', 'PhD'];
invalid
onSelecttype(event)
{
  this.dupjobs=[]
  console.log(event.target.value);
  
  if(event.target.value=='All'){
    this.dupjobs=this.jobs
  }

 else {for(var i of this.jobs)
  {
    if(i.experience.toLowerCase()==event.target.value.toLowerCase()){
      this.dupjobs.push(i)
    }
  }}
  console.log(this.dupjobs);
  
  
}
postjob(user: NgForm)
{
  if( user.value.batch>this.today.getFullYear() || user.value.batch.length!=4)
  {
   this.dateError=true
   // console.log(user.value.batch.lenght());
    
  }
  else{
    this.dateError=false
  if(user.valid){
     var data=user.value
    for (let varable of Object.keys( data))
    {
        this.newJob[varable]=data[varable].trim()
    }
    this.newJob['userId']=localStorage.getItem('token')
    this.serve.postjob(this.newJob).subscribe(data=>{
      if(data['status']='ok')
      {
        this.posted=true
        this.serve.getAlljobs().subscribe((responsejobs)=>{
          this.jobs=[]
          for(let i of responsejobs['alljobs']){
               this.jobs.push(i[0])
               if(i[0]['userId']==localStorage.getItem('token')){
                 this.yourjobs.push(i[0])
               }
          }
          this.dupjobs=this.jobs
         })
      }
        
    })
}
  else{
    this.invalid=true
    console.log("invalid");
  }
} 
  
}
deleteJob(job)
{
  var json={'jobid':job._id,
  'userId':localStorage.getItem('token')}
  this.serve.deletejob(json).subscribe((responsejobs)=>{
    this.jobs=[]
    this.yourjobs=[]
  for(let i of responsejobs['alljobs']){
    this.jobs.push(i[0])
    if(i[0]['userId']==localStorage.getItem('token')){
      this.yourjobs.push(i[0])
    }
}
this.dupjobs=this.jobs
})
  
}
}
