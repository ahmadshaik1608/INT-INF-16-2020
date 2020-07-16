import { Component, OnInit } from '@angular/core';
import { MyserviceService } from "../../myservice.service";

@Component({
  selector: 'app-alumniprofiles',
  templateUrl: './alumniprofiles.component.html',
  styleUrls: ['./alumniprofiles.component.css']
})
export class AlumniprofilesComponent implements OnInit {

  constructor(private serve:MyserviceService) {
   this.hideme={}
    serve.getProfiles().subscribe(data=>{
      this.profiles=data
      console.log(this.profiles);
      this.loading=false
    })
   }
loading=true
profiles=[]
showProfiles=true
createProfile
file
successMsg
errorMsg
hideme = {};
  ngOnInit(): void {
  }
create(name,year,description,designation,company)
{
  this.loading=true
  this.loading=true
  if(this.file!=null && name!=null && year!=null && description!=null && designation!=null && company!=null ){
   var formData = new FormData();
   formData.append('file', this.file);
   formData.append('name',name);
   formData.append('year',year)
   formData.append('description',description)
   formData.append('designation',designation);
   formData.append('company',company)
   console.log(formData);
  
 
   this.serve.createNewProfile(formData).subscribe(data=>{
     if(data['status']=='ok')
     {
       this.profiles=data['docs']
        this.createProfile=false
        this.loading=false
     }
   })
  }
  else{
   this.errorMsg=true
  }
   
}
onFileSelect(event) {
  if (event.target.files.length > 0) {
   this.file = event.target.files[0];
  }
}
FadeOutMsg() {
  setTimeout( () => {
        this.errorMsg=false
         this.successMsg = false;
      }, 4000);
 }
 delete(each)
 {
   this.loading=true
  this.serve.deleteProfiles({id:each._id}).subscribe(data=>{
    if(data['status']=='ok')
  {
    this.profiles=data['docs']
   
     this.createProfile=false
     this.showProfiles=true
     this.loading=false
  }
  })
 }
 save(each)
 {
   this.loading=true

   
 this.serve.updateProfiles(each).subscribe(data=>{
  if(data['status']=='ok')
  {
    this.profiles=data['docs']
   
     this.createProfile=false
     this.loading=false
  }
})
 
 }
}
