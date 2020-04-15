import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { MyserviceService } from '../myservice.service'
import { MyserviceGuard } from 'app/myservice.guard';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,
              private serve:MyserviceService) { }
myVar
notUpdated=false
firstName="Ahmad"
email
phone
designation
profilepic
password
company="Infosys"
location="Hyderabad"
_id
update={}
  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.myVar = data.id || 'defaultValue';
      // console.log(this.serve.datauaser)
    });
    this.serve.datauaser.subscribe(result=>{
     this.firstName=result['message'][0]['Name']
     this.email=result['message'][0]['email']
     this.phone=result['message'][0]['phone']
     this.company=result['message'][0]['company']
     this.designation=result['message'][0]['designation']
     this.location=result['message'][0]['location']
     this.password=result['message'][0]['password']
     this._id=result['message'][0]['_id']
     this.profilepic=result['message'][0]['profilepic']
     console.log(this.profilepic);
     
    })
  }
updateProfile()
{
  this.update['Name']=this.firstName
  this.update['email']=this.email
  this.update['phone']=this.phone
  this.update['company']=this.company
  this.update['password']=this.password
  this.update['designation']=this.designation
  this.update['company']=this.company
  this.update['location']=this.location
  this.update['_id']=this._id
  console.log(this.update);
  
  this.serve.updateProfile(this.update).subscribe(result=>{
    this.notUpdated=true
    this.firstName=result['message'][0]['Name']
    this.email=result['message'][0]['email']
    this.phone=result['message'][0]['phone']
    this.company=result['message'][0]['company']
    this.designation=result['message'][0]['designation']
    this.location=result['message'][0]['location']
    this.password=result['message'][0]['password']
      console.log(result)
  })
}
images
onfileselect(event){
  if(event.target.files.length>0){
    
    const file=event.target.files;
    for(let img of file)
    {
    this.images=img;
    
    
  }
}
}
profilepicupload(){
  const formdata=new FormData();
  formdata.append('file',this.images);
  formdata.append('id',this._id);

  this.serve.uploadprofilepic(formdata).subscribe((result)=>{
    console.log(result);
    
    // this.profilepic=result['message'][0]['profilepic']
});
}

  
}
