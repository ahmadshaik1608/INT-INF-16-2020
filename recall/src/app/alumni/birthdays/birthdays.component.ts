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
  ngOnInit(): void {
    this.service.datauaser.subscribe(result=>
      {
        this.birthdayToday=result['Todaybdays'];
        this.todaycount=result['Todaybdays'].length;
        
        this.birthdayTommorow=result['Tommorwbdays'];
        this.tommorowcount=result['Tommorwbdays'].length;

        this.birtdaythismonth=result['thismonth'];
        this.birtdaythismonthcount=result['thismonth'].length;
      })
  }

}
