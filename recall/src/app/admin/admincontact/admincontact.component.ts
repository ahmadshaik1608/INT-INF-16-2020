import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.component.html',
  styleUrls: ['./admincontact.component.css']
})
export class AdmincontactComponent implements OnInit {

  constructor(private serve:MyserviceService) { }
 email="rcall@vidyaniethan.edu"
 mobile=9292922292
 url="vidyanikethan.edu"
 address="Tirupati"
  ngOnInit(): void {
  }
update()
{
  var data={
    'email':this.email,
    'phone':this.mobile,
    'link':this.url,
    'address':this.address
  }
  this.serve.updatecontactus(data).subscribe((data)=>{
    console.log(data);
    
  })
}
}
