import { Component, ViewChild , ElementRef ,OnInit} from '@angular/core';
import { HostListener} from "@angular/core";
import { Server } from 'http';
import { MyserviceService } from 'app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // myInnerHeight: window.innerHeight;
  today=new Date();
  time;
  showallnotif=false
  showallmail=false
  showallbday=false
  toggle=false
  @ViewChild('sidediv') sidediv: ElementRef;
  @ViewChild('menuul') menuul: ElementRef;
  @ViewChild('maindiv') maindiv: ElementRef;
  innerHeight: any;
    innerWidth: any;
    showEventdropdown=false
    showjobstreetdropdown=false
    testmonial=''
    dummytestmonial=''
    isGiven
    birthdayToday=[]
    bdaycount
    userdata
  constructor(private serve:MyserviceService,  public router: Router,
    private route: ActivatedRoute) { 
    
    // this.innerHeight =window.innerHeight;
    // this.innerWidth = window.innerWidth;
    // console.log(this.innerHeight);
    // console.log(window.innerHeight);

    if( localStorage.getItem('isLoggedIn')=="true"  )
    {
      this.serve.datauaser.subscribe(result=>{
        this.birthdayToday=result['Todaybdays'];
        this.bdaycount=this.birthdayToday.length
         this.userdata=result['message'][0]
      })
    }
    
  }

  ngOnInit(): void {

  }
  tooglediv()
  {
    if(this.toggle)
    {
      this.sidediv.nativeElement.style.width='0px';
      this.menuul.nativeElement.hidden=true;
      this.maindiv.nativeElement.style.marginLeft='0px'
      this.toggle=!this.toggle
    }
    else{
      this.sidediv.nativeElement.style.width='230px';
      this.menuul.nativeElement.hidden=false
      this.maindiv.nativeElement.style.marginLeft='230px'
      this.toggle=!this.toggle
    }
  }
  logout(){
    this.serve.logout()
    this.router.navigate([''])
  }

}
