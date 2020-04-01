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
  @ViewChild('navdiv') navdiv: ElementRef;
  @ViewChild('navdiv2') navdiv2: ElementRef;
  @ViewChild('logo') logoBox: ElementRef;
  @ViewChild('logosmall') logosmall: ElementRef;

 testimonialClick=false
 logoPath="assets/images/recall-logo.jpg";
 logoHeight=68;
 innerWidth=0
 intialHeight=55.484375
 notSelected=true
 popupopen=false
 @HostListener('window:resize', ['$event'])

 onResize(event) {
   this.innerWidth = window.innerWidth;
   window.innerWidth<767 ? this.changesize2(): this.resetPosition2();
   window.innerWidth<1300 ?    this.navdiv.nativeElement.hidden =true:   this.navdiv.nativeElement.hidden =false;
   window.innerWidth<1220 && window.innerWidth>767 ?    this.navdiv2.nativeElement.hidden =true:   this.navdiv2.nativeElement.hidden =false;
   window.innerWidth<1220 ? this.fixedBox.nativeElement.style.position="fixed":this.fixedBox.nativeElement.style.position="sticky"
   window.innerWidth<1220 ? this.fixedBox.nativeElement.style.marginTop="0px":this.fixedBox.nativeElement.style.marginTop="1%"
   console.log(this.innerWidth)
 }
 changesize2()
 {
  this.logoBox.nativeElement.style.position ="relative";
  this.logoBox.nativeElement.hidden =true;
  this.logosmall.nativeElement.hidden =false;
  this.navdiv2.nativeElement.hidden =false;
  this.logoHeight=50;
 }
 resetPosition2()

{
  this.logoBox.nativeElement.style.position ="absolute";
  this.logoBox.nativeElement.hidden =false;
  this.logosmall.nativeElement.hidden =true;
  this.navdiv2.nativeElement.hidden =true;
  this.logoHeight=68;
} 
@HostListener("window:scroll", [])
 onWindowScroll() {
  this.intialHeight=55.484375
  const rect = this.fixedBox.nativeElement.getBoundingClientRect();
  
  rect.top==0 ? this.changePostion(): this.resetPosition();
 }
 changePostion()
 {
  this.logoBox.nativeElement.style.top = "40px";
  // this.logoBox.nativeElement.style.position ="absolute";
  this.logoHeight=50;
 }
 resetPosition()
 {
  this.logoBox.nativeElement.style.top = "0px";
  // this.logoBox.nativeElement.style.position ="absolute";
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

