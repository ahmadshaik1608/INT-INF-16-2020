import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {  ViewChild , ElementRef} from '@angular/core';
import { Subscription, BehaviorSubject } from "rxjs";
import * as $ from 'jquery' 
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('notificationDiv') notifDiv: ElementRef;
  searchTerm = new Subject<string>();
  gotdata=false
  resultSet=null
  search=null
  searchText
  selectedMember=false
  Member
  Adminid
  imageToupload
  imageTouploadIn 
  websitelogo
  institutelogo
  logosid
  hideSuccessMessageSS=false
  showaddInstitute=false
  showaddBranch=false
  selectedInstitute=999
  instSelect=false
  allInstitutes={}
  branches=[]
  notificationmessage=''
  inst
  constructor(private service:MyserviceService) { 

    this.service.datauaser.subscribe(data=>{
      this.firstName=data.message[0].Name
      this.email=data.message[0].email
      this.Adminid=data.message[0]._id
    })
 
 
    this.service.adminsList$.subscribe(()=>{
      console.log("jbdjhsd");
      
       this.getAdmins()
    })
 
   this.refresh$.subscribe(()=>{
     console.log("Changed");
     
      this.getAdmins()     
    })
     this.service.getlogo().subscribe(data=>{
       // console.log(data);
             this.logosid=data['settings'][0]['_id']
              this.websitelogo=data['settings'][0]['websitelogo']
              this.institutelogo=data['settings'][0]['institutelogo']
              this.socialSitesData=data['settings'][0]['socialsites']
              this.inst=data['settings'][0]['institutes']
              this.gotdata=true
            
     })
 

    this.searchTerm.pipe(
      debounceTime(1000))
      .subscribe(value => {
       if(value.length!=0){
        service.selectalumni(value).subscribe(data=>{
          this.resultSet=data
          this.search=true
        })
      }
      else{
        this.resultSet=[]
        this.search=false
      }
      });
    
   }
firstName
email
password
notUpdated
createnew
dummy=[1,2,3,4]
admins
socialSitesData
refresh$=new BehaviorSubject<boolean>(true)
  ngOnInit(): void {
    
  
     
  }


  private getAdmins()
  {
     this.service.getalladmins().subscribe(data=>{
       this.admins=data
    console.log(data.length);
    
     
   })
 }
hideSuccessMessage = false;

  FadeOutSuccessMsg() {
    setTimeout( () => {
           this.hideSuccessMessage = false;
           this.hideSuccessMessageSS=false;
          //  this.notifDiv.nativeElement.classList.remove('active')
        }, 4000);
   }
    FadeOutMsg() {
    setTimeout( () => {
          //  this.hideSuccessMessage = false;
          //  this.hideSuccessMessageSS=false;
           this.notifDiv.nativeElement.classList.remove('active')
        }, 4000);
   }

updateProfile()
{
  var data={
      email:this.email,
      Name:this.firstName,
      password:this.password,
      id:this.Adminid
  }
  this.hideSuccessMessage=true
  this.service.updateAdmindetails(data).subscribe(data=>{
    console.log(data);
    
  })
}
select(id)
{

 
  this.service.searchalumni({_id:id._id}).subscribe(data=>{
    this.Member=data[0]
    this.selectedMember=true
  })
}
grantaccess()
{
  this.service.grantAsadmin({_id:this.Member._id}).subscribe(data=>{   
    console.log(data);
    
  })
  this.refresh$.next(this.Member._id)
}
removeaccess(data)
{
  this.service.removeAsadmin({_id:data._id}).subscribe(data=>{  
    console.log(data);
    
  })
  this.refresh$.next(data._id)
    
}

updatewebsitelogo()
{
  const formData: FormData = new FormData();
  formData.append('file', this.imageToupload);
  formData.append('id',this.logosid);
  formData.append('type','websitelogo');
  this.service.updatelogo(formData).subscribe(data=>{
    this.logosid=data['settings'][0]['_id']
    this.websitelogo=data['settings'][0]['websitelogo']

  })
}
updateinstitutelogo()
{
  const formData: FormData = new FormData();
  formData.append('file', this.imageTouploadIn);
  formData.append('id',this.logosid);
  formData.append('type','institutelogo');
  this.service.updatelogo(formData).subscribe(data=>{
    this.logosid=data['settings'][0]['_id']
    this.institutelogo=data['settings'][0]['institutelogo']
  })
}
onImageSelect(event) {
  if (event.target.files.length > 0) {
   this.imageToupload = event.target.files[0];
  }
}
onImageSelectIn(event) {
  if (event.target.files.length > 0) {
   this.imageTouploadIn = event.target.files[0];
  }
}
updateSocialSites()
{
   var data={
     Facebook:this.socialSitesData['Facebook'],
     Twitter :this.socialSitesData['Twitter'],
     Google:this.socialSitesData['Google'],
     Youtube:this.socialSitesData['Youtube'],
     Linkedin:this.socialSitesData['Linkedin'],
     Instagram:this.socialSitesData['Instagram']
  }
  this.service.updateSocialsites(data).subscribe(data=>{
              if(data['status']=='ok')
              {
      
                this.hideSuccessMessageSS=true
              }
  })
}
addinst(name)
{
  this.notifDiv.nativeElement.classList.add("active")
   if(name!='')
   {
     this.service.addInstitute({name:name}).subscribe(data=>{
      if(data['status']=='ok')
      {
         this.showaddInstitute=false
         this.inst=data['settings'][0]['institutes']
      }
       
     })
   }
}
addBranch(name)
{
  console.log(this.selectedInstitute);
  var data={
    id:this.logosid,
    inst:this.selectedInstitute['name'],
    branch:name
  }
  this.service.addBranch(data).subscribe(data=>{
    if(data['status']=='ok')
    {
       this.showaddInstitute=false
       this.inst=data['settings'][0]['institutes']
       console.log(this.selectedInstitute);
       
       this.showaddBranch=false
       for(var i of this.inst)
       {
         console.log(i);
         
         if(i.name==this.selectedInstitute['name'])
         {
           this.branches=i.branches;
           
         }
      
       }
    }
  })
  
}
onInstSelect(i){
   this.selectedInstitute=i
   this.branches=i.branches 
   this.instSelect=true
   
}
deleteBranch(name)
{
  var data={
    id:this.logosid,
    inst:this.selectedInstitute['name'],
    branch:name
  }
  this.service.removeBranch(data).subscribe(data=>{
    if(data['status']=='ok')
    {
       this.showaddInstitute=false
       this.inst=data['settings'][0]['institutes']
       for(var i of this.inst)
       {
         if(i.name==this.selectedInstitute['name'])
         {
           this.branches=i.branches;
           
         }
      
       }
    }
  })
}
deleteInst(i)
{
  var data={
    id:this.logosid,
    instid:i._id,
 
  }
  this.service.removeInst(data).subscribe(data=>{
    if(data['status']=='ok')
    {
       this.showaddInstitute=false
       this.inst=data['settings'][0]['institutes']
       this.branches=[]
       this.showaddBranch=false
       
    }
  })
}

}
