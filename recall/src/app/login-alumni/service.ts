import { Injectable } from '@angular/core';   
// import {Http,Response, Headers, RequestOptions } from '@angular/http';   
import {HttpClient} from '@angular/common/http'
import { User } from './user.model';
   
// import { Observable } from 'rxjs/Observable';  
// import 'rxjs/add/operator/map';  
// import 'rxjs/add/operator/do';  
  
@Injectable()  
export class LoginServiceclass {  
  
  constructor(private http: HttpClient) { }  
  
  validateLogin(user:User){      
    return this.http.post('http://localhost:3000/api/loginUser/',{
        username:user.username,
    password:user.password})               
  }  
  
} 