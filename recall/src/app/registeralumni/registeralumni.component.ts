import { Component, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { FormControl,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Userreg} from './userreg.model'
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-registeralumni',
  templateUrl: './registeralumni.component.html',
  styleUrls: ['./registeralumni.component.css']
})
export class RegisteralumniComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private serve:MyserviceService) {  }

  images
  public newuser ={
    'firstname':'',
    'lastname':'',
  'email':'',
  'branch':'',
  'gender':'',
  'dateofbirth':'',
  'phone':'',
  'bio':'',
  'password':'',
  'company':'',
  'location' : '',
  'designation':'',
  'rollno':'',
  'yop':'',
  'image':new FormData()
  };
  response
 fd = new FormData();
  branches =["Computer Science and Engineering",
              "Electronics and Communication Engineering",
              "Mechanical Engineering",
              "Electrical Engineering",
              "Civil Engineering",
              "Information Technology (IT)",
              "Computer Science and System Engineering (CSSE)"]
  @ViewChild("profilepic") profilepic;
  registerForm: FormGroup;
 isPasswordvalid=false
  step1=false
  step2=false
  usergender
  defaultProfile="assets/images/default_profile.jpg";
  isregistered=false
  

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['',[ Validators.required,Validators.minLength(3)]],
      lastName : ['',[ Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone :['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]+")]],
      bio : ['',[Validators.required]],
      pass:[''],company:[],location:[],dateofbirth:[],designation:[],
      rollno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      yop:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern("[0-9]+")]],
      branch: [null, [ Validators.required ] ],image:[]
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

  onpicselect(event){
    if(event.target.files.length>0){
      
      this.images=event.target.files[0];
      // console.log(this.images['name'])
   
  }
}
hello()
{
  this.serve.register().subscribe((data)=>{
    console.log(data.status
    )
  })
}
process(data)
{
 console.log(this.images)
 this.newuser['rollno']=data.rollno;
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
  this.newuser['branch']=data.branch;
  this.newuser['yop']=data.yop;
  this.newuser['gender']=this.usergender;
  this.newuser['image']=this.images
  const formData = new FormData();
  formData.append('data', JSON.stringify(this.newuser));
  formData.append('file', this.images,this.images['name']);
  this.serve.registerUser(formData).subscribe(
    (response)=>{
      console.log(response)
      if(response.status=="success")
      {
        this.isregistered=true
      }
    },
    error => {
      console.log(error);
    }
    //  if(data.status=='ok')
    //  {
    //    this.isregistered=true
    //  }
  )
  console.log(this.newuser)
}



}
