import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-halloffame',
  templateUrl: './halloffame.component.html',
  styleUrls: ['./halloffame.component.css']
})
export class HalloffameComponent implements OnInit {

  hofimage="assets/images/download.jpg"
  constructor() { }

  ngOnInit() {
    window.scrollTo({ top: 0});
  }

}
