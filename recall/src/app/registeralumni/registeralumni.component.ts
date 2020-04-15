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
  default_profile='default_profile.jpg'
  public newuser ={

  };
  response
 fd = new FormData();
 registeredAs
 branches=[]
 Allbranches=[
   [],
   ["Bachelor of Business Administration (B.B.A)",
        "Bachelor of Commerce (B.Com)",
        "Bachelor of Computer Application(B.C.A)",
        "Bachelor of Arts (B.A)",
        "Master of Science (M.Sc)",
        "Master of Commerce (M.Com)"
    ],
    ["Computer Science and Engineering",
        "Electronics and Communication Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Information Technology (IT)",
        "Computer Science and System Engineering (CSSE)"
      ],
     [],
     ['Pharm.D','B.Pharm','M.Pharm'],
     [],
     ["MBA",'MCA']    
 ]
  svec =["Computer Science and Engineering",
              "Electronics and Communication Engineering",
              "Mechanical Engineering",
              "Electrical Engineering",
              "Civil Engineering",
              "Information Technology (IT)",
              "Computer Science and System Engineering (CSSE)"
            ]
  svdc=["Bachelor of Business Administration (B.B.A)",
        "Bachelor of Commerce (B.Com)",
        "Bachelor of Computer Application(B.C.A)",
        "Bachelor of Arts (B.A)",
        "Master of Science (M.Sc)",
        "Master of Commerce (M.Com)"]
  svim=["MBA",'MCA']
  svip=['Pharm.D','B.Pharm','M.Pharm']

  institutes=[
    "Sree Vidyanikethan International School(SVIS), Tirupati",
    "Sree Vidyanikethan Degree College(SVDC)",
    "Sree Vidyanikethan Engineering College(SVEC)",
    "Sree Vidyanikethan College of Nursing(SVCN)",
    "Sree Vidyanikethan College of Pharmacy(SVCP)",
    "Sree Vidyanikethan International School(SVIS), Hyderabad",
    "Sree Vidyanikethan Institute of Management(SVIM)"

  ];

  associates=[
    'Employee','Alumni','Student','Faculty'
  ]
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
      Name: ['',[ Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone :['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]+")]],
      password:['',[Validators.required,Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")]]
      ,company:[],location:[],dateofbirth:[],designation:[],
      rollno:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      yop:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern("[0-9]+")]],
      yoj:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern("[0-9]+")]],
      associates:[],institution:[],
      branch: [],
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
  console.log(data)
  for (let varable of Object.keys( data))
  {
      this.newuser[varable]=data[varable].trim()
  }
  this.serve.registerUser(this.newuser).subscribe(
    (data)=>
    {
      this.registeredAs=data.associates
      this.isregistered=true
    })
 
}
selectedassociate
selectNo
onChangeassociate(event){
   this.registerForm.controls.rollno.disable();
   this.registerForm.controls.yoj.disable();
   this.registerForm.controls.yop.disable();
   this.registerForm.controls.branch.disable();
   this.registerForm.controls.institution.disable();
   this.registerForm.controls.company.disable();
   this.registerForm.controls.designation.disable();
   this.registerForm.controls.location.disable();
  console.log( event.target)
  this.selectedassociate= event.target.value;
  this.selectNo=this.selectedassociate.substr(0,1)
  if(this.selectNo==4)
  {
    this.registerForm.controls.yoj.enable();  this.registerForm.controls.branch.enable();
    this.registerForm.controls.institution.enable();
  }
  else if(this.selectNo==2)
  {
    this.registerForm.controls.rollno.enable();
    this.registerForm.controls.yop.enable();
    this.registerForm.controls.branch.enable();
    this.registerForm.controls.institution.enable();
    this.registerForm.controls.company.enable();
    this.registerForm.controls.designation.enable();
    this.registerForm.controls.location.enable();
  }
  else if(this.selectNo==3)
  {
    this.registerForm.controls.rollno.enable();
    this.registerForm.controls.yoj.enable();
    this.registerForm.controls.branch.enable();
    this.registerForm.controls.institution.enable();
  }
  else{
    this.registerForm.controls.company.enable();
    this.registerForm.controls.designation.enable();
    this.registerForm.controls.location.enable();
  }
}

institute
instituteselect=false
onChangeinstitute(event){
  console.log( event.target.value)
  this.instituteselect=false
  this.institute= event.target.value;
  this.branches=this.Allbranches[this.institute.substr(0,1)-1]
  console.log(this.branches)
  if(this.branches.length!=0)
  {
    this.instituteselect=true
  }
}

}
