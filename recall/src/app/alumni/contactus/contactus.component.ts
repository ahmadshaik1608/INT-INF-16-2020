import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  loading=true
  email
  mobile
  url
  address
  id
  editDetails=false
  constructor(private formBuilder:FormBuilder,private serve:MyserviceService) { 
    serve.getcontact().subscribe((data)=>{
      this.id=data['details'][0]['_id']
     this.email=data['details'][0]['email']
     this.mobile=data['details'][0]['phone']
     this.url=data['details'][0]['link']
     this.address=data['details'][0]['address']
     this.loading=false
      
    })
  //  this.loading=false
 
  }
  feedBackform:FormGroup
  isFeedBacsubmited=false
  errorsinform=false
  ngOnInit() {
    this.feedBackform=this.formBuilder.group({
      firstname: ['',[ Validators.required,Validators.minLength(3)]],
      lastname : [],
      email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      comment :['',[Validators.required]]
    })

  }

  Comment(feedBackdata)
  {
    console.log(feedBackdata);
    
    if(this.feedBackform.valid)
    {
    this.serve.postComment(feedBackdata).subscribe(result=>{
      this.isFeedBacsubmited=true  
      this.errorsinform=false
    })
   
    }
      else{
        this.errorsinform=true
      }
  }
  
  // this.employees[0]={name:"George", age:32, retiredate:"March 12, 2014"}
  // employees[1]={name:"Edward", age:17, retiredate:"June 2, 2023"}
  // employees[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
  // employees[3]={name:"Sarah", age:62, retiredate:"April 30, 2020"}
}
