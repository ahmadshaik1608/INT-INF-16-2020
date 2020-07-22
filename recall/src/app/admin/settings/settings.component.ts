import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { debounceTime, switchMap, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {  ViewChild , ElementRef} from '@angular/core';
import { Subscription, BehaviorSubject } from "rxjs";
import * as $ from 'jquery' 
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('notificationDiv') notifDiv: ElementRef;
  searchTerm = new Subject<string>();
  loading=true
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
  emptyInstitute=false
  emptyBranch=false
  inst
  loginUserId
  noWebsitelogo=false
  noInstlogo=false
  constructor(private service:MyserviceService,private toastr: ToastrService) { 
    this.loginUserId=localStorage.getItem('token')
    this.service.datauaser.subscribe(data=>{
      this.firstName=data.message[0].Name
      this.email=data.message[0].email
      this.Adminid=data.message[0]._id
    })
 
 
    this.service.adminsList$.subscribe(()=>{
  
       this.getAdmins()
    })
 
   this.refresh$.subscribe(()=>{
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
    this.loading=false
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
       console.log(this.admins);
       
    console.log(data.length);
    
     
   })
 }
hideSuccessMessage = false;

  FadeOutSuccessMsg() {
    setTimeout( () => {
           this.hideSuccessMessage = false;
           this.hideSuccessMessageSS=false;
           this.emptyBranch=false
           this.emptyInstitute=false
           this.noWebsitelogo=false
           this.noInstlogo=false
           //  this.notifDiv.nativeElement.classList.remove('active')
        }, 4000);
   
   }

updateProfile()
{
  this.loading=true
  var data={
      email:this.email,
      Name:this.firstName,
      password:this.password,
      id:this.Adminid
  }
  this.service.updateAdmindetails(data).subscribe(data=>{
    console.log(data);
    this.showSuccess('Personal Details Updated Succesfully')
    this.loading=false
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
  if(this.Member.isadmin)
  {
        this.toastr.warning('Alraedy A Admin')
  }
  else
  {
    this.loading=true
    this.service.grantAsadmin({_id:this.Member._id}).subscribe(data=>{   
    this.admins=data
    this.showSuccess('Granted Admin Access to '+this.Member.name)
    this.createnew=false;this.Member=null;this.selectedMember=false
    this.loading=false
  })
  }
}
removeaccess(data)
{

  
  this.loading=true
  this.service.removeAsadmin({_id:data._id}).subscribe(data=>{  
    this.showSuccess('Removed Admin Access to '+data.Name)
    this.admins=data
    this.loading=false
    
  }) 
}

updatewebsitelogo()
{
  if(this.imageToupload!=null){
  this.loading=true
  const formData: FormData = new FormData();
  formData.append('file', this.imageToupload);
  formData.append('id',this.logosid);
  formData.append('type','websitelogo');
  this.service.updatelogo(formData).subscribe(data=>{
    this.logosid=data['settings'][0]['_id']
    this.websitelogo=data['settings'][0]['websitelogo']
    this.showSuccess('Website Logo Updated Succesfully')
    this.loading=false
  })
}
else{
  this.noWebsitelogo=true
  this.FadeOutSuccessMsg()
}
}
updateinstitutelogo()
{
if(this.imageTouploadIn!=null)
 {
   this.loading=true
    const formData: FormData = new FormData();
  formData.append('file', this.imageTouploadIn);
  formData.append('id',this.logosid);
  formData.append('type','institutelogo');
  this.service.updatelogo(formData).subscribe(data=>{
    this.logosid=data['settings'][0]['_id']
    this.institutelogo=data['settings'][0]['institutelogo']
    this.showSuccess('Institute   Logo Updated Succesfully')
    this.loading=false
  })
}
else{
  this.noInstlogo=true
  this.FadeOutSuccessMsg()
}
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
  this.loading=true
  this.service.updateSocialsites(data).subscribe(data=>{
              if(data['status']=='ok')
              {
      
                this.showSuccess('Social Networks Links Updated Succesfully')
                this.loading=false
              }
  })
}
addinst(name)
{

   if(name!='')
   {
     this.loading=true
     this.service.addInstitute({name:name}).subscribe(data=>{
      if(data['status']=='ok')
      {
         this.showaddInstitute=false
         this.inst=data['settings'][0]['institutes']
         this.showSuccess('Institute '+name+' Added Succesfully')
         this.loading=false
      }
     
     })
   }
   else{
     this.emptyInstitute=true
     this.FadeOutSuccessMsg()
   }
}
addBranch(name)
{
  if(name!=''){
  var data={
    id:this.logosid,
    inst:this.selectedInstitute['name'],
    branch:name
  }
  this.loading=true
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
       this.showSuccess('Branch '+name+' Added Succesfully')
       this.loading=false
    }
  
  })
} else{
    this.emptyBranch=true
    this.FadeOutSuccessMsg()
}
  
}
onInstSelect(i){
   this.selectedInstitute=i
   this.branches=i.branches 
   this.instSelect=true
   
}
deleteBranch(name)
{
  this.loading=true
  var data={
    id:this.logosid,
    inst:this.selectedInstitute['name'],
    branch:name
  }
  this.service.removeBranch(data).subscribe(data=>{
    if(data['status']=='ok')
    {
       this.instSelect=false
       this.inst=data['settings'][0]['institutes']
       for(var i of this.inst)
       {
         if(i.name==this.selectedInstitute['name'])
         {
           this.branches=i.branches;
           
         }
      
       }
       this.showSuccess('Branch '+name+' Removed Succesfully')
    }
    this.loading=false
  })
}
deleteInst(i)
{
  this.loading=true
  this.instSelect=false
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
       this.showSuccess('Institute '+i.name+' Removed')
    }
    this.loading=false
  })
}
showSuccess(message){
  // this.toastr. = {
  //   "closeButton": false,
  //   "debug": false,
  //   "newestOnTop": false,
  //   "progressBar": false,
  //   "positionClass": "toast-top-center",
  //   "preventDuplicates": false,
  //   "onclick": null,
  //   "showDuration": "300",
  //   "hideDuration": "1000",
  //   "timeOut": "5000",
  //   "extendedTimeOut": "1000",
  //   "showEasing": "swing",
  //   "hideEasing": "linear",
  //   "showMethod": "fadeIn",
  //   "hideMethod": "fadeOut"
  // }
  // this.toastr.timeOut()
  // this.toastr.
  this.toastr.success(message,'',{ closeButton:true})
}
// showFailure(message){
//   this.toastr.error(message,'',{timeOut:0, closeButton:true})
// }
}
