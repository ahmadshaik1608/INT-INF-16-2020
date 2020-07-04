import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-adminalmnijobstreet',
  templateUrl: './adminalmnijobstreet.component.html',
  styleUrls: ['./adminalmnijobstreet.component.css']
})
export class AdminalmnijobstreetComponent implements OnInit {
  loading=true

  constructor( private serve:MyserviceService) {
    this.serve.getAlljobs().subscribe((responsejobs)=>{
      console.log(responsejobs);
      
      for(let i of responsejobs['alljobs']){
           this.jobs.push(i[0])
           if(i[0]['userId']!=localStorage.getItem('token')){
             this.yourjobs.push(i[0])
           }
      }
      this.dupjobs=this.yourjobs
      this.loading=false
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
    this.loading=true
    console.log(event.target.value);
    
    if(event.target.value=='All'){

      this.dupjobs=this.yourjobs
      this.loading=false
    }
  
   else {
     for(var i of this.yourjobs)
    {
      if(i.experience.toLowerCase()==event.target.value.toLowerCase()){
        this.dupjobs.push(i)
      }
    }
    this.loading=false
  }
    console.log(this.dupjobs);
    
    
  }
}
