import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewallhalloffame',
  templateUrl: './viewallhalloffame.component.html',
  styleUrls: ['./viewallhalloffame.component.css']
})
export class ViewallhalloffameComponent implements OnInit {

  constructor() { }
 members=[
   {'name':"sk ahmad",'year':2018,'branch':'Computer Science and Engineering','passed':'2015'},
   {'name':'henry nicolus','year':2017,'branch':'Computer Science and System Engineering','passed':'2013'}
 ]
 hofyear=2019
 hofBranch="Computer Science and Engineering"
 position="Junior Developer"
 company="Tata"
 location="Hydrabad"
 hofpassyear=2017
 recenthof="assets/images/download.jpg"
  ngOnInit() {
  }

}
