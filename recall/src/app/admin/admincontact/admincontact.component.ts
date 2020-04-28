import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.component.html',
  styleUrls: ['./admincontact.component.css']
})
export class AdmincontactComponent implements OnInit {

  email
  mobile
  url
  address
  id
  constructor(private serve:MyserviceService) { 
    serve.getcontact().subscribe((data)=>{
      console.log(data['details']);
      this.id=data['details'][0]['_id']
     this.email=data['details'][0]['email']
     this.mobile=data['details'][0]['phone']
     this.url=data['details'][0]['link']
     this.address=data['details'][0]['address']
      
    })
  }

  ngOnInit(): void {
  }
update()
{
  var data={
    'id':this.id,
    'email':this.email,
    'phone':this.mobile,
    'link':this.url,
    'address':this.address
  }
  this.serve.updatecontactus(data).subscribe((data)=>{
    this.id=data['details'][0]['_id']
    this.email=data['details'][0]['email']
    this.mobile=data['details'][0]['phone']
    this.url=data['details'][0]['link']
    this.address=data['details'][0]['address']    
  })
}
}
