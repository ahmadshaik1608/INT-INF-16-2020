import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";
import { MyserviceService } from 'app/myservice.service';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

chapterData
userData
newEvent=false
eventForm:FormGroup
err=false
  constructor( private router:Router,private formBuilder:FormBuilder,
    private route: ActivatedRoute,private serve:MyserviceService) {

     }


  ngOnInit(): void {
   this.chapterData= history.state.event;
   console.log(this.chapterData);
   
   this.serve.datauaser.subscribe(data=>{
       this.userData=data['message'][0]
    
   })
   this.eventForm=this.formBuilder.group({
    eventname: ['',[ Validators.required]],
    location: ['',[ Validators.required]],
    eventdate: ['',[ Validators.required]],
    eventtime: ['',[ Validators.required]]
   })
  }


 joinChapter()
 {
   var chdata={
      chapter:this.chapterData._id,
      mId:localStorage.getItem('token')
   }
   console.log(chdata);
   
   this.serve.joinChapter(chdata).subscribe(data=>{

   })
 }
 leaveChapter()
 {
   var chdata={
      chapter:this.chapterData._id,
      mId:localStorage.getItem('token')
   }
   console.log(chdata);
   
   this.serve.leaveChapter(chdata).subscribe(data=>{

   })
 }
 createEvent(data)
 {
  var H = +data.eventtime.substr(0, 2);
  var h = H % 12 || 12;
  var ampm = (H < 12 || H === 24) ? "AM" : "PM";
   data.eventtime= h + data.eventtime.substr(2, 3) +' '+ampm;
   data['createdby']=this.userData.Name;
   data['chapterid']=this.chapterData._id
      
    if(this.eventForm.valid){
      this.err=false
         this.serve.createChapterEvent(data).subscribe(data=>{
            if(data['status']=='ok')
            {
              
              this.newEvent=false
            }
             
         })
             
    }
    else{
      this.err=true
    }

    
 }
}
