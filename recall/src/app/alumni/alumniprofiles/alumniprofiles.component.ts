import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumniprofiles',
  templateUrl: './alumniprofiles.component.html',
  styleUrls: ['./alumniprofiles.component.css']
})
export class AlumniprofilesComponent implements OnInit {

  constructor() { }
  profiles=[
    {'name':"Genny",'branch':'Computer Science','designation':'C.E.O','company':'Infosys','profile':'assets/images/profile1.jpg','aboutprofile':'Genny’s career has been driven by equal parts passion and tenacity, traits that have driven her success since working in Deloitte’s Consulting practice. She is now the Head of Listings at Aequitas NEO Exchange'},
    
    {'name':"Priya",'branch':'Electronics and Electrical','designation':'Managing Director','company':'TCS','profile':'assets/images/profile2.jpg','aboutprofile':'She was the first graduate of Crenshaw High School to attend Princeton, the first person in her family to attend college and now is operating a business that teaches financial literacy to low-income youth and adults.the first person in her family to attend college and now is operating a business that teaches financial literacy to low-income youth and adults.'},
    {'name':"Genny",'branch':'Computer Science','designation':'C.E.O','company':'Infosys','profile':'assets/images/profile1.jpg','aboutprofile':'Genny’s career has been driven by equal parts passion and tenacity, traits that have driven her success since working in Deloitte’s Consulting practice. She is now the Head of Listings at Aequitas NEO Exchange'},
    
    {'name':"Priya",'branch':'Electronics and Electrical','designation':'Managing Director','company':'TCS','profile':'assets/images/profile2.jpg','aboutprofile':'She was the first graduate of Crenshaw High School to attend Princeton, the first person in her family to attend college and now is operating a business that teaches financial literacy to low-income youth and adults.the first person in her family to attend college and now is operating a business that teaches financial literacy to low-income youth and adults.'}
    
  ]
  ngOnInit() {
  }

}
