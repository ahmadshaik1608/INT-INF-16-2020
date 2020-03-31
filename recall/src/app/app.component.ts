import { Component, ViewChild , ElementRef} from '@angular/core';
import { HostListener} from "@angular/core";
declare const myTest: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  fixedBoxOffsetTop: number  = 0;
  @ViewChild('sticky') fixedBox: ElementRef;
  @ViewChild('logo') logoBox: ElementRef;
 testimonialClick=false
 logoPath="assets/images/recall-logo.jpg";
 logoHeight=68;
 intialHeight=55.484375
 notSelected=true
 popupopen=false
 @HostListener("window:scroll", [])
 onWindowScroll() {
  this.intialHeight=55.484375
  const rect = this.fixedBox.nativeElement.getBoundingClientRect();
  
  rect.top==0 ? this.changePostion(): this.resetPosition();

  
  // console.log(rect.top)
  console.log("hello scroled")
 }
 changePostion()
 {
  this.logoBox.nativeElement.style.top = "40px";
  this.logoHeight=50;
 }
 resetPosition()
 {
  this.logoBox.nativeElement.style.top = "0px";
  this.logoHeight=68;
 }

 selectedTab={
   'testimonial':false,
   'gtv':false,
   'contacts':false,
   'galary':false,
 }
  testimonial()
  {
    this.testimonialClick=true
    console.log("Test");
  }

  about()
  {
    this.notSelected=true
    for(let key in this.selectedTab)
    {
        this.selectedTab[key]=false
    }
  }
  display(clickd)
  {
    this.notSelected=false
    for(let key in this.selectedTab)
    {
      if(key == clickd)
      {
        this.selectedTab[key]=true
      }
      else{
        this.selectedTab[key]=false
      }
    }
  }
  onClick() {
    myTest();
  }
}

