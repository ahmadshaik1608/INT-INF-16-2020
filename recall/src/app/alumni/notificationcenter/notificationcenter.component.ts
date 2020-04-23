import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificationcenter',
  templateUrl: './notificationcenter.component.html',
  styleUrls: ['./notificationcenter.component.css']
})
export class NotificationcenterComponent implements OnInit {

  constructor() { }
notifications=[ 
  'Your registration was approved by Admin',
  'Naveen sent birthday wishes to you',
  'You can generate your QR-Code',
  'Kalyan sent birthday wishes to you',
]
  ngOnInit(): void {
  }

}
