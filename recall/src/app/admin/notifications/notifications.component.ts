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
  ngOnInit(): void {
    this.service.datauaser.subscribe(result=>{
      this.notifications=result['notifications']
      this.gotdata=true
      
    })
  }
deleteNotif(data)
{
 this.service.deleteNotifications({role:'Admin_Role',id:data._id}).subscribe(data=>{
  this.notifications=data['notifications']
 })
}

}
