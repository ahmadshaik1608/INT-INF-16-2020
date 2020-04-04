import { Component, OnInit } from '@angular/core';
import {RegisterServiceclass} from './registerservice'
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Userreg} from './userreg.model'
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-registeralumni',
  templateUrl: './registeralumni.component.html',
  styleUrls: ['./registeralumni.component.css']
})
export class RegisteralumniComponent implements OnInit {
  public newuser ={
    'firstname':'',
    'lastname':'',
  'email':'',
  'gender':'',
  'dateofbirth':'',
  'phone':'',
  'bio':'',
  'password':'',
  'company':'',
  'location' : '',
  'designation':''
  };
  registerForm: FormGroup;
 isPasswordvalid=false
  step1=false
  step2=false
  usergender
  defaultProfile="assets/images/default_profile.jpg"
  constructor(private formBuilder: FormBuilder,private serve:RegisterServiceclass) {

   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['',[ Validators.required,Validators.minLength(3)]],
      lastName : ['',[ Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone :['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]+")]],
      bio : ['',[Validators.required]],
      pass:[],company:[],location:[],dateofbirth:[],designation:[]
    });

  }
  passwordvalid(password,cpassword)
  {
    if(password && cpassword && password==cpassword)
    {
      this.isPasswordvalid=false
      this.step2=true;
    }
    else{
      this.isPasswordvalid=true
      this.step2=false
    }
  }
  gender(gen)
  {
    this.usergender=gen
  }
process(data)
{
  this.newuser['firstname']=data.firstName;
this.newuser['lastname']=data.lastName;
  this.newuser['email']=data.email;
  this.newuser['phone']=data.phone;
  this.newuser['bio']=data.bio;
  this.newuser['password']=data.pass;
  this.newuser['company']=data.company;
  this.newuser['location']=data.location;
  this.newuser['dateofbirth']=data.dateofbirth;
  this.newuser['designation']=data.designation;
  this.newuser['gender']=this.usergender;

  this.serve.registerUser(this.newuser).subscribe(response=>{
    console.log(response)
  })
  console.log(this.newuser)
}
}
