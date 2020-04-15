import { Component, OnInit,ViewChild , ElementRef } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  view="View More"
  @ViewChild('eventdiv') eventdiv: ElementRef;
  constructor() { }
 testmonial=''
 isEdit=false
  ngOnInit(): void {
   // this.testmonial=" Genny’s career has been driven by equal parts passion and tenacity, traits that have driven her success since working in Deloitte’s Consulting practice. She is now the Head of Listings at Aequitas NEO Exchang"
    
  }
  showMore(){
    if(this.view=="View More")
    {
        this.view="View Less"
        this.eventdiv.nativeElement.style.height="100%"
    }
    else{
      {
        this.view="View More"
        this.eventdiv.nativeElement.style.height="60px"
    }
    }
  }
  writetestmonial(){

  }
  deletetestmonial(){

  }
  edittestmonial(){
    this.isEdit=true
  }
}
