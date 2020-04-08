import { Component, OnInit ,ViewChild ,ElementRef} from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { User } from './user.model';
import { Router } from "@angular/router";
import { timingSafeEqual } from 'crypto';
import { MyserviceGuard } from '../myservice.guard'
import { from } from 'rxjs';

@Component({
  selector: 'app-login-alumni',
  templateUrl: './login-alumni.component.html',
  styleUrls: ['./login-alumni.component.css']
})
export class LoginAlumniComponent implements OnInit {
  @ViewChild('uname') unameInput: ElementRef;
  @ViewChild('pwd') password: ElementRef;

  public user : User;
  isLogin=false
  updateProfile=false
  loginError=false
  logindetails={}
  constructor(private serve:MyserviceService,
              public router: Router) {
    this.user=new User();
   }
 
  ngOnInit() {
  }
 validateUser()
 {
    if(this.user.username && this.user.password) {
      this.serve.validateLogin(this.user).subscribe((result )=> {;
        if(result['status']== 'success') {
          this.isLogin=true
          this.router.navigate([''])
          this.serve.setLoggedIn(true); 
        } else {
          this.loginError=true
        }
         
      }, error => {
        console.log('error is ', error);
      });
    } else {
       this.loginError=true
    }
 }
 logout(){
  this.isLogin=false
  this.serve.setLoggedIn(false); 
  this.router.navigate([''])
 }
}
