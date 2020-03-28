import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
import { User } from './user.model';
   
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
  
@Injectable()  
export class LoginServiceclass {  
  
  constructor(private http: Http) { }  
  
  validateLogin(user:User){      
    return this.http.post('http://localhost:8000/api/SaveUser/',{
        username:user.username,
    password:user.password})               
  }  
  
} 