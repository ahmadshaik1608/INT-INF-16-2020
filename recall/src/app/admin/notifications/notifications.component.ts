import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private service:MyserviceService) { }
notiflength=10
notifications
gotdata=false
loading=true
  ngOnInit(): void {
    this.service.datauaser.subscribe(result=>{
      this.notifications=result['notifications']
      this.loading=false
      this.gotdata=true
      
    })
  }
deleteNotif(data)
{
  this.loading=true
 this.service.deleteNotifications({role:'Admin_Role',id:data._id}).subscribe(data=>{
   this.loading=false
   console.log(data);
   
  this.notifications=data['data']
 })
}

}
