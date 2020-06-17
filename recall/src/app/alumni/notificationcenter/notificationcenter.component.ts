import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-notificationcenter',
  templateUrl: './notificationcenter.component.html',
  styleUrls: ['./notificationcenter.component.css']
})
export class NotificationcenterComponent implements OnInit {
notifications
notiflength
todaysdate
  constructor(private service:MyserviceService) {
    
   }

  ngOnInit(): void {
    this.todaysdate=new Date()
    this.service.datauaser.subscribe(result=>{
      console.log(result);
      
      this.notiflength=result['notifications']
    if(this.notiflength.length!=0)
        this.notifications= result['notifications']
      
    })
  }
  delete(id){
    console.log(id);
    
  }

}
