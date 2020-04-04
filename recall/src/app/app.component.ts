import { Component, ViewChild , ElementRef} from '@angular/core';
import { HostListener} from "@angular/core";
import { RouterLink } from '@angular/router';
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
  @ViewChild('globalchild') globalchild: ElementRef;

 testimonialClick=false
 logoPath="assets/images/recall-logo.jpg";
 profile="assets/images/profile1.jpg";
 logoHeight=68;
 innerWidth=0
 intialHeight=55.484375
 notSelected=true
 popupopen=false
 profilename="Genny"
 branch="Computer Science"
 slideNo=0
 aboutprofile="Genny’s career has been driven by equal parts passion and tenacity, traits that have driven her success since working in Deloitte’s Consulting practice. She is now the Head of Listings at Aequitas NEO Exchange,"
 profiles=[
   {'name':"Genny",'branch':'Computer Science','profile':'assets/images/profile1.jpg','aboutprofile':'Genny’s career has been driven by equal parts passion and tenacity, traits that have driven her success since working in Deloitte’s Consulting practice. She is now the Head of Listings at Aequitas NEO Exchange'},
   
   {'name':"PRiya",'branch':'Electronics and Electrical','profile':'assets/images/profile2.jpg','aboutprofile':'She was the first graduate of Crenshaw High School to attend Princeton, the first person in her family to attend college and now is operating a business that teaches financial literacy to low-income youth and adults.'}
  ]
 ngOnInit()
 {
   
 }
 @HostListener('window:resize', ['$event'])

 onResize(event) {
   this.innerWidth = window.innerWidth;
   window.innerWidth<767 ? this.changesize2(): this.resetPosition2();
   window.innerWidth<1300 ?    this.navdiv.nativeElement.hidden =true:   this.navdiv.nativeElement.hidden =false;
   window.innerWidth<1220 && window.innerWidth>767 ?    this.navdiv2.nativeElement.hidden =true:   this.navdiv2.nativeElement.hidden =false;
   window.innerWidth<1174 && window.innerWidth>767 ? this.globalchild.nativeElement.style.marginTop="7%":this.globalchild.nativeElement.style.marginTop="1%";
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
  this.logoBox.nativeElement.style.top = "35px";
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
  next()
  {
    console.log(this.slideNo)
    if(this.slideNo<this.profiles.length-1)
    {
      this.slideNo++;
    }
    else{
      this.slideNo=0;
    }
    console.log(this.slideNo)
  }
  prev()
  {
    if(this.slideNo>0)
    {
      this.slideNo--;
    }
    else{
      this.slideNo=this.profiles.length-1;
    }
  }
}

