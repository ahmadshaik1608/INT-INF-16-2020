import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }
  feedBackform:FormGroup
  isFeedBacsubmited=false
  errorsinform=false
  ngOnInit() {
    this.feedBackform=this.formBuilder.group({
      firstname: ['',[ Validators.required,Validators.minLength(3)]],
      lastname : ['',[ Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      comment :['',[Validators.required]]
    })
  }

  Comment()
  {
    if(this.feedBackform.valid)
    {
     this.isFeedBacsubmited=true  
    }
      else{
        this.errorsinform=true
      }
  }

}
