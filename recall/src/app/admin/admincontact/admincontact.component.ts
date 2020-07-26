import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.component.html',
  styleUrls: ['./admincontact.component.css']
})
export class AdmincontactComponent implements OnInit {
  loading=true
  email
  mobile
  url
  address
  id
  errorMsg=false
  constructor(private serve:MyserviceService,private toastr: ToastrService) { 
    serve.getcontact().subscribe((data)=>{
      console.log(data['details']);
      this.id=data['details'][0]['_id']
     this.email=data['details'][0]['email']
     this.mobile=data['details'][0]['phone']
     this.url=data['details'][0]['link']
     this.address=data['details'][0]['address']
     this.loading=false
      
    })
  }

  ngOnInit(): void {
  }

  FadeOutSuccessMsg() {
    setTimeout( () => {
        // this.errorMsg=false;
           //  this.notifDiv.nativeElement.classList.remove('active')
        }, 4000);
   
   }
update()
{
  
  if(this.id!=""&& this.email!="" && this.mobile!="" && this.url!="" && this.address!=""){
  var data={
    'id':this.id,
    'email':this.email,
    'phone':this.mobile,
    'link':this.url,
    'address':this.address
  }
  this.loading=true
  this.serve.updatecontactus(data).subscribe((data)=>{
    this.id=data['details'][0]['_id']
    this.email=data['details'][0]['email']
    this.mobile=data['details'][0]['phone']
    this.url=data['details'][0]['link']
    this.address=data['details'][0]['address']    
    this.showSuccess('Contact Details Updated Succesfully')
    this.loading=false
  })
}
else{
    this.showError("Please fill all the required fields")
}
}
showSuccess(message){
  this.toastr.success(message,'',{ closeButton:true})
}
showError(message){
  this.toastr.error(message,'',{ closeButton:true})
}

}
