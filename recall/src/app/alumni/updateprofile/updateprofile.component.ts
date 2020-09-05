import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { MyserviceService } from '../../myservice.service'
import { MyserviceGuard } from '../../myservice.guard';

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
loading=true
update={}
gotdata=false
errDiv=false
emptydata=false
error
emailerror
passworderror
showpassword=false
duppemail=false
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
     this.gotdata=true
     this.loading=false
    })
  }
updateProfile()
{
  this.error=false
  this.emailerror=false
  this.passworderror=false
  if(!this.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"))
  {
    this.error=true
    this.emailerror=true
    
  }
  else if(!this.password.match("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})"))
  {
    this.error=true
    this.passworderror=true
  }
  else{
   
  }

  if(!this.error){
  this.loading=true
  this.update['Name']=this.firstName
  this.update['email']=this.email
  this.update['phone']=this.phone
  this.update['company']=this.company
  this.update['password']=this.password
  this.update['designation']=this.designation
  this.update['company']=this.company
  this.update['location']=this.location
  this.update['_id']=this._id
  var noempty=0
  var keys = Object.keys(this.update);
  for(var i=0; i<keys.length; i++){
      var key = keys[i];
     if(this.update[key]=='' || this.update[key]==null)
                        {noempty=1}
  }
if(noempty==1)
{
    this.emptydata=true
    this.loading=false
}
 else{ 
   this.serve.updateProfile(this.update).subscribe(result=>{
     if(result['status']!='error')
     {
    this.notUpdated=true
    this.firstName=result['message'][0]['Name']
    this.email=result['message'][0]['email']
    this.phone=result['message'][0]['phone']
    this.company=result['message'][0]['company']
    this.designation=result['message'][0]['designation']
    this.location=result['message'][0]['location']
    this.password=result['message'][0]['password']
     // console.log(result)
     this.duppemail=false
     this.emailerror=false
     this.passworderror=false
      
     }
     else{
       this.error=true
       this.duppemail=true
     }
     this.loading=false
  })}
}
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
FadeOutSuccessMsg() {
  setTimeout( () => {
        this.errDiv=false
        this.emptydata=false
        this.notUpdated=false
        this.error=false
      //  this.emailerror=false
         //  this.notifDiv.nativeElement.classList.remove('active')
      }, 4000);
    }
profilepicupload(){
  this.loading=true
  const formdata=new FormData();
  if(this.images==null)
  {
    this.errDiv=true
  }
  formdata.append('file',this.images);
  formdata.append('id',this._id);

  this.serve.uploadprofilepic(formdata).subscribe((result)=>{
    console.log(result);
    
    this.profilepic=result['message'][0]['profilepic']
    this.loading=false
});
}
changeView()
{
  this.showpassword=!this.showpassword
}
  
}
