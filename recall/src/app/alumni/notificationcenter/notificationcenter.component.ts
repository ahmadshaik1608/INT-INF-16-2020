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
messagescount
loading=true
gotdata=false
  constructor(private service:MyserviceService) {
    this.todaysdate=new Date()
    this.service.datauaser.subscribe(result=>{     
      this.notiflength=result['notifications']
      this.messagescount=this.notiflength[0].messages.length
      
       
    if(this.notiflength.length!=0 && this.messagescount!=0 )
        this.notifications= result['notifications'][0]['messages']
        this.gotdata=true
    this.loading=false
    })
  
    
   }

  ngOnInit(): void {

  }
  delete(message){
    this.loading=true
   var deldata={
     role:'Alumni',
     mId:message._id,
     uid:this.notiflength[0].recieverid,
     id:this.notiflength[0]._id
   }
   console.log(deldata);
   
   this.service.deleteNotifications(deldata).subscribe(result=>{
    this.notiflength=result['data']
    this.messagescount=this.notiflength[0].messages.length
    if(this.notiflength.length!=0 && this.messagescount!=0 )
           this.notifications= result['data'][0]['messages']
             this.loading=false
   })
  
    
  }

}
