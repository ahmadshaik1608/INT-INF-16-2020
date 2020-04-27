import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-adminalmnijobstreet',
  templateUrl: './adminalmnijobstreet.component.html',
  styleUrls: ['./adminalmnijobstreet.component.css']
})
export class AdminalmnijobstreetComponent implements OnInit {

  constructor( private serve:MyserviceService) {
    this.serve.getAlljobs().subscribe((responsejobs)=>{
      console.log(responsejobs);
      
      for(let i of responsejobs['alljobs']){
           this.jobs.push(i[0])
           if(i[0]['userId']==localStorage.getItem('token')){
             this.yourjobs.push(i[0])
           }
      }
      this.dupjobs=this.jobs
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
}
