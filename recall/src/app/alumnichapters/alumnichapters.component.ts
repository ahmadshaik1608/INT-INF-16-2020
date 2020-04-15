import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnichapters',
  templateUrl: './alumnichapters.component.html',
  styleUrls: ['./alumnichapters.component.css']
})
export class AlumnichaptersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  chapters=[
    {'name':'Chennai','image':'../../assets/images/chennai.jpg'},
    {'name':'Banglore','image':'../../assets/images/bangalore.jpg'},
    {'name':'Hyderabad','image':'../../assets/images/hydrabad.jpg'}
  ]

}
