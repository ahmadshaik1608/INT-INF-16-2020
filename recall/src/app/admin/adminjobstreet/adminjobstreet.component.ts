import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-adminjobstreet',
  templateUrl: './adminjobstreet.component.html',
  styleUrls: ['./adminjobstreet.component.css']
})
export class AdminjobstreetComponent implements OnInit {
  loading=true
colors=[]
  constructor( private serve:MyserviceService) {
    this.colors=['#a2d200','#ff9501','#e74c3c','#1b93e1','#8e44ad','#00a65a','#F2EDD7FF']
    var min=0
   var max=7
  
    this.serve.getAlljobs().subscribe((responsejobs)=>{
      console.log(responsejobs);
      console.log(localStorage.getItem('token'));
      
      for(let i of responsejobs['alljobs']){
           this.jobs.push(i[0])
           if(i[0]['userId']==localStorage.getItem('token')){
             this.yourjobs.push(i[0])
           }
      }
      this.dupjobs=this.yourjobs
      for(var i=0;i<this.dupjobs.length;i++){
        this.dupjobs[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
    }
      // console.log(this.yourjobs);
      this.loading=false
     })
   }
   postAjob=false
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
    
      
      this.dupjobs=this.yourjobs
    }
  
   else {for(var i of this.yourjobs)
    {
      if(i.experience.toLowerCase()==event.target.value.toLowerCase()){
        this.dupjobs.push(i)
      }
    }}
    console.log(this.dupjobs);
    
    
  }
  postjob(user: NgForm)
  {
    this.loading=true
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
            for(let i of responsejobs['alljobs']){
                 this.jobs.push(i[0])
                 if(i[0]['userId']==localStorage.getItem('token')){
                   this.yourjobs.push(i[0])
                 }
            }
            this.dupjobs=this.yourjobs
            // console.log(this.yourjobs);
           })
        }
          this.loading=false
      })
  }
    else{
      this.invalid=true
      console.log("invalid");
      this.loading=false
    }
      
    
  }
  deleteJob(job)
  {
    this.loading=true
    var json={'jobid':job._id}
    this.serve.deletejob(json).subscribe((responsejobs)=>{
      this.jobs=[]
      this.yourjobs=[]
    for(let i of responsejobs['alljobs']){
      this.jobs.push(i[0])
      if(i[0]['userId']==localStorage.getItem('token')){
        this.yourjobs.push(i[0])
      }
  }
  this.dupjobs=this.yourjobs
  this.loading=false
  })
    
  }
}
