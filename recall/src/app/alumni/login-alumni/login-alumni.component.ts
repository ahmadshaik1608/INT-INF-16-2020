import { Component, OnInit ,ViewChild ,ElementRef} from '@angular/core';
import { MyserviceService } from '../../myservice.service';
import { User } from './user.model';
import { Router ,ActivatedRoute} from "@angular/router";
import { timingSafeEqual } from 'crypto';
import {Moment} from 'moment';
import { MyserviceGuard } from '../../myservice.guard'
import { from } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-login-alumni',
  templateUrl: './login-alumni.component.html',
  styleUrls: ['./login-alumni.component.css']
})
export class LoginAlumniComponent implements OnInit {
  @ViewChild('uname') unameInput: ElementRef;
  @ViewChild('pwd') password: ElementRef;

  public user : User;
  isLogin:boolean=false
  updateProfile=false
  profilepic
  name
  branch
  batch
  isAdmin
  loginError=false
  logindetails={}
  id
  constructor(private serve:MyserviceService,
              public router: Router,
              private route: ActivatedRoute) {
    this.user=new User();
   }
 
  ngOnInit() {
    if( localStorage.getItem('isLoggedIn')=="true"  )
    {
      this.isLogin=true
      this.serve.datauaser.subscribe(result=>{
        this.name=result['message'][0]['Name']
        this.branch=result['message'][0]['branch']
        this.batch=result['message'][0]['yop']
        this.profilepic=result['message'][0]['profilepic']
      })
    }
  }
 validateUser()
 {
    if(this.user.username && this.user.password) {
      this.serve.validateLogin(this.user).subscribe((result )=> {
        console.log(result)
        if(result['status']== 'success') {
          if(result['isAdmin'])
          {
            localStorage.setItem('isLoggedIn',"true");  
            localStorage.setItem('token', result['message'][0]['_id']);  
            localStorage.setItem('role','Admin')
            this.router.navigate(['/Admin/Dashboard'])
          }
          else
         { 
           this.name=result['message'][0]['Name']
          this.branch=result['message'][0]['branch']
          this.profilepic=result['message'][0]['profilepic']
          console.log(moment(result['message'][0]['dateofbirth']).format('ddd,MMM DD'))
          this.isLogin=true 
          localStorage.setItem('isLoggedIn',"true");  
          localStorage.setItem('role','Alumni')
          localStorage.setItem('token', result['message'][0]['_id']);  
          this.router.navigate(['Alumni/HomePage'])
          this.serve.setLoggedIn(true); 
        }
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
  console.log('logout');  
  this.serve.logout();  
  this.isLogin=false 
  this.router.navigate([''])
  // window.location.reload()
 }
}
