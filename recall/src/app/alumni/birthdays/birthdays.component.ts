import { Component, OnInit } from '@angular/core';
import { MyserviceService } from "../../myservice.service";


@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  buttondesc="Convey Wishes"
  constructor(private service:MyserviceService) { }
  birthdayToday
  todaycount
  birthdayTommorow
  tommorowcount
  birtdaythismonth
  birtdaythismonthcount
  userdata
  gotdata=false
  loading=true
  today: number = Date.now();

  ngOnInit(): void {
    this.service.datauaser.subscribe(result=>
      {
        this.userdata=result['message']

        this.birthdayToday=result['Todaybdays'];
        this.todaycount=result['Todaybdays'].length;
        
        this.birthdayTommorow=result['Tommorwbdays'];
        this.tommorowcount=result['Tommorwbdays'].length;

        this.birtdaythismonth=result['thismonth'];
        this.birtdaythismonthcount=result['thismonth'].length;
        this.gotdata=true
        this.loading=false
      })
  }

  wish(data)
  {
    this.loading=true
    console.log(this.userdata);
    var notifidata={
      recieverid:data._id,
      senderid:localStorage.getItem('token'),
      message:this.userdata[0].Name+' Wished on your birthday',
      type:'B'
    }
    this.service.postnotification(notifidata).subscribe(data=>{
      console.log(data);
      this.loading=false
    })
  }

}
