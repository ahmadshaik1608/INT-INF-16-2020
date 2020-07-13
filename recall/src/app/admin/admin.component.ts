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
  liselected
  toggle=false
  gotdata=false
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
    useencount=0
    notifications=[]
    comments=[]
    newComments=0
  constructor(private serve:MyserviceService,  public router: Router,
    private route: ActivatedRoute) { 
 
  }
  ngOnInit() {
    this.liselected=this.router.url.split(/[/ ]+/).pop()
    
    setInterval(() => {
      this.today = new Date();
    }, 1);
  if( localStorage.getItem('isLoggedIn')=="true"  )
  {
    this.serve.datauaser.subscribe(result=>{
    this.notifications=result['notifications'] 
    this.comments=result['comments']
    if(this.notifications.length>0){
    for(let i of this.notifications[0].messages )
    {
      console.log(i);
      
      if(i.seen==0)
          this.useencount++
    }
  }
  if(this.comments.length>0){
    for(let i of this.comments )
    {
      if(i.seen==0)
         this.newComments++
    }
  }
  
      this.birthdayToday=result['Todaybdays'];
      
      this.bdaycount=this.birthdayToday.length
       this.userdata=result['message'][0]

       this.gotdata=true
    })
  }
  
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
