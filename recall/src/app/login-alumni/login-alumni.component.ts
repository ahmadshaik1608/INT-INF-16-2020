import { Component, OnInit } from '@angular/core';
import { LoginServiceclass } from './service';
import { User } from './user.model';

@Component({
  selector: 'app-login-alumni',
  templateUrl: './login-alumni.component.html',
  styleUrls: ['./login-alumni.component.css']
})
export class LoginAlumniComponent implements OnInit {
  public user : User;
  isLogin=false
  logindetails={}
  constructor(private serve:LoginServiceclass) {
    this.user=new User();
   }
 
  ngOnInit() {
  }
 validateUser()
 {
  console.log("gfcafsfa")
    if(this.user.username && this.user.password) {
      this.serve.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result.status == 200) {
          this.isLogin=true
        } else {
          alert('Wrong username password');
        }
         
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }
 }
}
