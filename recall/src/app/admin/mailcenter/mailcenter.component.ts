import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import {Observable, Subject} from 'rxjs';
import {map, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
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
 replydata=''
  constructor(private service:MyserviceService,private http:HttpClient,private toastr: ToastrService) {
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
   if(this.mailtype==null)
   {
        // this.Errordiv=true
        this.showWarning("Please Select Recipients")
   }
   else{
     this.Errordiv=false 
     if(this.mailtype=='batch')
     {
      var reg = new RegExp('^\\d{4}$');
       if(this.batch==null && this.maildata==null){
         this.showError("Enter a valid year for Batch")
       }
       else if(this.batch!=null && !reg.test(this.batch))
       {
        this.showError("Enter a valid year for Batch")
       }
       else{
         if(this.subject==null ||this.maildata==null)
         {
          this.showWarning("Subject or Message Fields are empty")
         }
        
        else{
         var sendmaildata={
           type:'yop',
           group:[this.batch],
           subject:this.subject,
           message:this.maildata
         }
        
         this.service.sendMail(sendmaildata).subscribe(data=>{
          if(data['status']=='ok')
                       this.showSuccess('Mail Sent Succesfully To All '+this.batch+' Batch Alumni')
         })
        }
       }
     }
     else if(this.mailtype=='institution')
     {
        if(this.selectedinstitute==null &&this.maildata==null){
          this.showWarning("Select Institution")
        }
        else{
          if(this.subject==null ||this.maildata==null)
          {
           this.showWarning("Subject or Message Fields are empty")
          }
          else{
          var sendmaildata={
            type:'institution',
            group:[this.selectedinstitute],
            subject:this.subject,
            message:this.maildata
          }
          this.service.sendMail(sendmaildata).subscribe(data=>{
            if(data['status']=='ok')
            this.showSuccess('Mail Sent Succesfully To All '+this.selectedinstitute+' Alumni')
          })
        }
        }
     }
     else if(this.mailtype=='Chapter')
     {
        if(this.selectedchapter==null && this.maildata==null){
          this.showWarning("Select Chapter")
        }
        else{
          if(this.subject==null ||this.maildata==null)
          {
           this.showWarning("Subject or Message Fields are empty")
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
            if(data['status']=='ok')
            this.showSuccess('Mail Sent Succesfully To All '+this.selectedchapter+' Chapter Alumni')
          })
        }
      }
     }
     else if(this.mailtype=='All Alumni')
     {
      if(this.subject==null ||this.maildata==null)
      {
       this.showWarning("Subject or Message Fields are empty")
      }
       else
         { 
           var sendmaildata={
            type:'all',
            group:[],
            subject:this.subject,
            message:this.maildata
          }
          this.service.sendMail(sendmaildata).subscribe(data=>{
            if(data['status']=='ok')
            this.showSuccess('Mail Sent Succesfully To All Alumni')
         
          })
        }
     }
    else{
      // if(this.selected.length==0)
      // {
      //   this.showWarning("Recipents List is Empty")
      // }
      if(this.subject==null ||this.maildata==null)
      {
       this.showWarning("Subject or Message Fields are empty")
      }
     else{
      var sendmaildata={
        type:'individual',
        group:this.selected,
        subject:this.subject,
        message:this.maildata
      }
      this.service.sendMail(sendmaildata).subscribe(data=>{
        if(data['status']=='ok')
        this.showSuccess('Mail Sent Succesfully To Selected Alumni')
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
sendmail(reply)
{
  if(this.replydata!='')
 {
    var data={
    message:this.replydata,
    email:reply.email,
    comment:reply.comment,
    cId:reply._id
    }
  this.service.sendCommentReply(data).subscribe(data=>{
    if(data['status']=='ok')
    this.showSuccess('Reply Sent Succesfully To '+reply.firstname)
    reply.reply=false;reply.answered=true
  })
  }
  else{
    this.showWarning('Enter text to send reply')
  }
}
showSuccess(message){
  this.toastr.success(message,'',{ closeButton:true})
}
showError(message){
  this.toastr.error(message,'',{ closeButton:true})
}
showWarning(message){
  this.toastr.warning(message,'',{ closeButton:true})
}
}
