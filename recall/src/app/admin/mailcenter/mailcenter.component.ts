import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import {Observable, Subject} from 'rxjs';
import {map, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
declare var $: any;

@Component({
  selector: 'app-mailcenter',
  templateUrl: './mailcenter.component.html',
  styleUrls: ['./mailcenter.component.css']
})
export class MailcenterComponent implements OnInit {
  @ViewChild('userName') userInput: ElementRef;

  loading: boolean
  searchTerm = new Subject<string>();
  resultSet
  selected=[]
  recipients=[]
  Errordiv=false  
  search:boolean
  subject
  mailtype=null
  batcherror=null
  instituteError=null
  chapterError=null
  batch=null
  maildataError=null
 maildata
  selectedinstitute=null
  selectedchapter=null
   institutes=[
     "Sree Vidyanikethan International School(SVIS), Tirupati",
     "Sree Vidyanikethan Degree College(SVDC)",
     "Sree Vidyanikethan Engineering College(SVEC)",
     "Sree Vidyanikethan College of Nursing(SVCN)",
     "Sree Vidyanikethan College of Pharmacy(SVCP)",
     "Sree Vidyanikethan International School(SVIS), Hyderabad",
     "Sree Vidyanikethan Institute of Management(SVIM)"
 
   ];
   chapters=[
     "Hyderabad Chapter","Chennail Chapter","Banglore Chapter"
   ]
 allComments=[]
 today
 showreply=false
 reply=false

  constructor(private service:MyserviceService,private http:HttpClient) {
   this.today=new Date()
    this.searchTerm.pipe(
      debounceTime(1000))
      .subscribe(value => {
       if(value.length!=0){
        service.selectalumni(value).subscribe(data=>{
          this.resultSet=data
          this.loading=false
          this.search=true
        })
      }
      else{
        this.resultSet=[]
        this.search=false
      }
      });


      service.getComments().subscribe(data=>{
        console.log(data);
        
        this.allComments=data['comments']
      })
        // $('.enter-mail-id').click()

   }

  ngOnInit(): void {
  }
 select(alumni){
   var present=false
  for( var i = this.selected.length; i--;){
    if ( this.selected[i]._id === alumni._id)
            present=true
    }
    if(!present)
        this.selected.push(alumni)
 }
 onChangeinstitute(event)
 {
   this.selectedinstitute=event.target.value
 }
 onChangechapter(event){
   this.selectedchapter=event.target.value
 }

sendMail(){
  this.maildataError=false
  var sendmaildata={
    type:'',
    group:[null],
    subject:null,
    message:null
  }
  if(this.maildata==null)
  {
   this.maildataError=true
  }

   if(this.mailtype==null)
   {
        this.Errordiv=true
   }
   else{
     this.Errordiv=false
     if(this.mailtype=='batch')
     {
      var reg = new RegExp('^\\d{4}$');
       if(this.batch==null && this.maildata==null){
         this.batcherror=true
       }
       else if(this.batch!=null && !reg.test(this.batch))
       {
                this.batcherror=true 
       }
       else{
         this.batcherror=false
         var sendmaildata={
           type:'yop',
           group:[this.batch],
           subject:this.subject,
           message:this.maildata
         }
         this.service.sendMail(sendmaildata).subscribe(data=>{

         })
       }
     }
     else if(this.mailtype=='institution')
     {
        if(this.selectedinstitute==null &&this.maildata==null){
          this.instituteError=true
        }
        else{
          this.instituteError=false
          var sendmaildata={
            type:'institution',
            group:[this.selectedinstitute],
            subject:this.subject,
            message:this.maildata
          }
          this.service.sendMail(sendmaildata).subscribe(data=>{
           
          })
        }
     }
     else if(this.mailtype=='Chapter')
     {
        if(this.selectedchapter==null && this.maildata==null){
          this.chapterError=true
        }
        else{
          this.chapterError=false
          var sendmaildata={
            type:'chapter',
            group:[this.selectedchapter],
            subject:this.subject,
            message:this.maildata
          }
          this.service.sendMail(sendmaildata).subscribe(data=>{
           
          })
        }
     }
     else if(this.mailtype=='All Alumni')
     {
       if(this.maildata!=null)
         { 
           var sendmaildata={
            type:'all',
            group:[],
            subject:this.subject,
            message:this.maildata
          }
          this.service.sendMail(sendmaildata).subscribe(data=>{
           
          })
        }
     }
    else{
      if(this.selected.length!= 0 &&this.maildata!=null){
      var sendmaildata={
        type:'individual',
        group:this.selected,
        subject:this.subject,
        message:this.maildata
      }
      this.service.sendMail(sendmaildata).subscribe(data=>{
           
      })
    } 
  }
   }
   console.log(sendmaildata);
   
}

clear(id){
   console.log(id);
  for( var i = this.selected.length; i--;){
    if ( this.selected[i]._id === id)
            this.selected.splice(i, 1);
    }
}
}
