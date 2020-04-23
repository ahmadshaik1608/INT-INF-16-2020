import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editevents',
  templateUrl: './editevents.component.html',
  styleUrls: ['./editevents.component.css']
})
export class EditeventsComponent implements OnInit {
 expandup=false
 expandpast=false
  constructor() { }
  all=[1,2,3,4,5,6,1,2,3,4,5,6]
  editEvent=true
  ngOnInit(): void {
  }

}
