import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Subscription, BehaviorSubject } from "rxjs";
import * as $ from 'jquery' 
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
  constructor(private service:MyserviceService) { 

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
      this.gotdata=true
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
            //  for(var i=0;i< data['settings'][0]['institutes'].length;i++){
            //      console.log(data['settings'][0]['institutes'][i].key);
                 
            //         this.allInstitutes.push(data['settings'][0]['institutes'][i])
            //  }
             var inst=data['settings'][0]['institutes']
             Object.keys(inst).forEach(key => {
              console.log('key', key);     
              console.log('value', inst[key]);    
              Object.keys(inst[key]).forEach(key2 => { 
              this.allInstitutes[key2]=inst[key][key2]
              })
          });
              
    
           
    })

     
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
           this.hideSuccessMessageSS=false
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
   if(name!=null)
   {
     this.service.addInstitute({name:name}).subscribe(data=>{
      if(data['status']=='ok')
      {
         this.showaddInstitute=false
      }
       
     })
   }
}
onInstSelect(i){
   this.selectedInstitute=i
   this.branches=this.allInstitutes[i]
   this.instSelect=true
   
}

}
