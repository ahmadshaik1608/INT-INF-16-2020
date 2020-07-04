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
  ngOnInit(): void {
    this.service.datauaser.subscribe(result=>{
      this.notifications=result['notifications']
      console.log(result);
      
    })
  }
deleteNotif(data)
{
 this.service.deleteNotifications({role:'Admin_Role',id:data._id}).subscribe(data=>{
  this.notifications=data['notifications']
 })
}

}
