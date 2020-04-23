import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventpageComponent implements OnInit {
  event
  eventsList=[
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"}
  ]
  constructor(public router: Router,
             private route: ActivatedRoute){ }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.event= {'id':121,'name':"EXPERT LECTURE ON “HIGHER EDUCATIONAL OPPORTUNITIES IN GERMANY”",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"}
  }


}
