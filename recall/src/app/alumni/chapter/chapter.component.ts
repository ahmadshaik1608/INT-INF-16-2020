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
isChapterMember=false
gotdata=false
loading=true
  constructor( private router:Router,private formBuilder:FormBuilder,
    private route: ActivatedRoute,private serve:MyserviceService) {

     }


  ngOnInit(): void {
   this.chapterData= history.state.event;
   console.log(this.chapterData);
   this.serve.datauaser.subscribe(data=>{
       this.userData=data['message'][0]
       if(this.userData.chapter!=null)
                  this.isChapterMember=true
        this.loading=false
        this.gotdata=true
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
   this.loading=true
   var chdata={
      chapter:this.chapterData._id,
      name:this.chapterData.chaptername,
      mId:localStorage.getItem('token')
   }
   console.log(chdata);
   this.serve.joinChapter(chdata).subscribe(data=>{
              this.chapterData==data['chapters'][0]
              console.log(this.chapterData);
              console.log(this.chapterData.membersData);
              
              this.isChapterMember=true
              this.loading=false
   })
 }
 leaveChapter()
 {
   this.loading=true
   var chdata={
      chapter:this.chapterData._id,
      mId:localStorage.getItem('token')
   }
   console.log(chdata);
   
   this.serve.leaveChapter(chdata).subscribe(data=>{
                    if(data['status']=='ok')
                    {
                      this.isChapterMember=false
                      this.loading=false
                    }
   })
 }
 createEvent(data)
 {
   this.loading=true
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
              this.loading=false
            }
             
         })
             
    }
    else{
      this.err=true
    }

    
 }
}
