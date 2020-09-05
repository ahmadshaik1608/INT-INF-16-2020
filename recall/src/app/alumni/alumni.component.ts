import { Component, ViewChild , ElementRef ,OnInit} from '@angular/core';
import { HostListener} from "@angular/core";
import { RouterLink, Router } from '@angular/router';
import {MyserviceService} from 'app/myservice.service'
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {

  title = 'app works!';
  fixedBoxOffsetTop: number  = 0;
  @ViewChild('sticky') fixedBox: ElementRef;
  @ViewChild('navdiv') navdiv: ElementRef;
  @ViewChild('navdiv2') navdiv2: ElementRef;
  @ViewChild('logo') logoBox: ElementRef;
  @ViewChild('logosmall') logosmall: ElementRef;
  @ViewChild('globalchild') globalchild: ElementRef;
  @ViewChild('logoRecall') logoBoxrecall: ElementRef;
  @ViewChild('logoRecallsmall') logorecallsmall: ElementRef;
  onActivate() {
    document.body.scrollTop = 0;
}
gotdata=false
 employees:any
 testimonialClick=false
 logoPath="assets/images/svec3.png";
 profile="assets/images/svec3.png";
 logoPath2="assets/images/recall-logo.jpg";
 logoHeight=100;
 logo2Height=60;
 innerWidth=0
 intialHeight=55.484375
 notSelected=true
 popupopen=false
 profilename="Genny"
 branch="Computer Science"
 slideNo=0
 aboutprofile="Genny’s career has been driven by equal parts passion and tenacity, traits that have driven her success since working in Deloitte’s Consulting practice. She is now the Head of Listings at Aequitas NEO Exchange,"
 profiles=[]
  loading=true
  email
  mobile
  url
  address
  id
  siteUrls=[]
  constructor(private formBuilder:FormBuilder,private serve:MyserviceService,private route:Router
                                          ,private toastr: ToastrService) { 
    serve.getcontact().subscribe((data)=>{
      this.id=data['details'][0]['_id']
     this.email=data['details'][0]['email']
     this.mobile=data['details'][0]['phone']
     this.url=data['details'][0]['link']
     this.address=data['details'][0]['address']
     this.loading=false
      
    })
    serve.getProfiles().subscribe((data)=>{
      if(data.length>5)
      {
       for(var i=0;i<5;i++)
       {
         this.profiles.push[data[i]]
       }
      }
      else{
        this.profiles=data
      }
    })
  //  this.loading=false
  serve.getlogo().subscribe(data=>{
         this.siteUrls=data['settings'][0]['socialsites'];
         this.profile=this.logoPath2=data['settings'][0]['websitelogo'];
         this.logoPath=data['settings'][0]['institutelogo'];
         
  })
  this.gotdata=true
  }
 ngOnInit()
 {
    localStorage.setItem("Admin",'false')
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
  this.logoBoxrecall.nativeElement.hidden=true
  this.logosmall.nativeElement.hidden =false;
  this.logosmall.nativeElement.style.marginLeft="-100%"
  this.navdiv2.nativeElement.hidden =false;
  this.logorecallsmall.nativeElement.hidden=false
  this.logoHeight=100;
 }
 resetPosition2()

{
  this.logoBox.nativeElement.style.position ="absolute";
  this.logoBox.nativeElement.hidden =false;
  this.logoBoxrecall.nativeElement.hidden=false;
  this.logosmall.nativeElement.hidden =true;
  this.navdiv2.nativeElement.hidden =true;
  this.logorecallsmall.nativeElement.hidden=true;
  this.logoHeight=100;
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
  this.logoBoxrecall.nativeElement.style.top="35px";
  this.logoBox.nativeElement.style.marginTop="-3%"
  // this.logoBox.nativeElement.style.position ="absolute";
  this.logoHeight=60;
  this.logo2Height=40;
 }
 resetPosition()
 {
  this.logoBox.nativeElement.style.top = "0px";
  this.logoBoxrecall.nativeElement.style.top = "0px";
  this.logoBox.nativeElement.style.marginTop="-4%"
  // this.logoBox.nativeElement.style.position ="absolute";
  this.logoHeight=100;
  this.logo2Height=60
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

  checkLogin()
  {
   if(localStorage.getItem('token')==null)
   {
     this.route.navigate(['/Alumni/registerWithUs'])
   }
    else{
      
    
    }
    
  }

  gotoSVEI()
  {
    window.open("https://www.vidyanikethan.edu/");
  }
}
