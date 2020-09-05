import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private serve:MyserviceService,private route:Router) { }
  loading=false
  showemailerr
  noemail
  showOtpdiv=false
  showotperr=false
  showPasswordDiv=false
  emailDisable=false
  passmatcherr=false
  passvalid=false
  usermail
  passwordupdate=true
  succesMsg=false
 resendtimer=false
  timeLeft: number = 30;
  interval;
  subscribeTimer: any;
  ngOnInit(): void {
  }
  sendotp(email)
  {
   console.log(email);
   
    if(email=='')
    {
      this.noemail=true
      this.FadeoutMessage()
    }
    else if(!email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"))
    {
           this.showemailerr=true;
           this.FadeoutMessage()
    }
    else{
      this.loading=true
       this.serve.forgetPassword({email:email}).subscribe(data=>{
         console.log(data);
         if(data['status']=='success')
         {
           this.usermail=email
           this.resendtimer=true
             this.showOtpdiv=true
             this.emailDisable=true
             this.startTimer()
         }
         else{
           this.showemailerr=true
           this.FadeoutMessage()
         }
       })
       this.loading=false
    }
  }
  onOtpChange(event){
    if(event.length==6)
    {
      this.serve.checkOtp({email:this.usermail,otp:event}).subscribe(data=>{
                      if(data['status']=='success')
                      {
                        this.showPasswordDiv=true
                      }
                      else{
                        this.showotperr=true
                        this.FadeoutMessage()
                      }
      })
         
    }
    else{
       this.showPasswordDiv=false
    }
    
  }
  changePassword(pass,cpass)
  {
    if(pass.match("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})"))
    {
      if(pass==cpass)
      {
        this.serve.changePassword({email:this.usermail,password:pass}).subscribe(data=>{
                 this.passwordupdate=false
                 this.succesMsg=true
                 setTimeout(() => {
                 this.route.navigateByUrl('/')
                }, 3000);
        })
        
      }
      else
      {
        this.passmatcherr=true
        this.FadeoutMessage()
      }
    }
    else{
      this.passvalid=true
      this.FadeoutMessage()
    }
  }

resendOTP()
{
  this.sendotp(this.usermail)
  this.timeLeft=30;
  this.resendtimer=true
  this.startTimer()
}
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.resendtimer=false
        clearInterval(this.interval);
        return
      }
    },1000)
  }

  FadeoutMessage()
  {
      setTimeout(() => {
        this.noemail=false
        this.showemailerr=false
        this.showotperr=false
        this.passvalid=false
        this.passmatcherr=false
      }, 3000);
  }
}
