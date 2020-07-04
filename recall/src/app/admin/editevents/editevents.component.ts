import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-editevents',
  templateUrl: './editevents.component.html',
  styleUrls: ['./editevents.component.css']
})
export class EditeventsComponent implements OnInit {
  
  loading=true
 expandup=false
 expandpast=false
 selectedevent
 allEvents
 eventid
 pastevents=[]
 upcomingevents=[]
 eventForm:FormGroup
 errordata=false
 successdiv=false
 today = new Date();


  constructor(private formBuilder: FormBuilder,private serve:MyserviceService) {
    this.today.setDate(this.today.getDate());
    this.today.setHours(5,30,0,0)
   
    serve.getevents().subscribe(data=>{
      this.allEvents=data
      for(let event of this.allEvents){
      
        if(new Date(event['startdate'])>this.today){
          this.upcomingevents.push(event)
        }
        else if(new Date(event['enddate'])<this.today){
          this.pastevents.push(event)
        }
      }
    })
   
   }
  all=[1,2,3,4,5,6,1,2,3,4,5,6]
  openeditEvent=false
  ngOnInit(): void {
  }
editevent(eventdetails)
{
 
  
  this.openeditEvent=true
  this.selectedevent=eventdetails
  this.eventid=this.selectedevent['_id']
  this.eventForm = this.formBuilder.group({
    'eventname':[this.selectedevent.eventname, Validators.required],
    'organisedby':[this.selectedevent.organisedby, Validators.required],
    'startdate':[moment(this.selectedevent.startdate).format('YYYY-MM-DD'), Validators.required],
    'enddate':[moment(this.selectedevent.enddate).format('YYYY-MM-DD'), Validators.required],
    'starttime':[this.selectedevent.starttime, Validators.required],
    'endtime':[this.selectedevent.endtime, Validators.required],
    'venue':[this.selectedevent.venue, Validators.required],
    'subtext':[this.selectedevent.subtext],'para1':[this.selectedevent.description[0]],'para2':[this.selectedevent.description[1]],
    'para3':[this.selectedevent.description[2]],'para4':[this.selectedevent.description[3]],

  })
}
cancel()
{
  this.openeditEvent=false
}
update(data)
{
  this.successdiv=false
  this.errordata=false
  if(data.valid){
    console.log(data.value);
    data.value['id']=this.eventid
    this.serve.updateevent(data.value).subscribe((data)=>{
        if(data.status=='ok')
             this.successdiv=true
    })
    
  }
  else{
    this.errordata=true
  }
}
delete(event)
{
 var data={
    id : event['_id']
  }
  this.serve.deleteevent(data).subscribe(data=>{
    this.allEvents=data
    this.upcomingevents=[]
    this.pastevents=[]
    for(let event of this.allEvents){
      if(new Date(event['enddate'])>this.today){
        this.upcomingevents.push(event)
      }
      else if(new Date(event['enddate'])<this.today){
        this.pastevents.push(event)
      }
    }
      
  })
}
}
