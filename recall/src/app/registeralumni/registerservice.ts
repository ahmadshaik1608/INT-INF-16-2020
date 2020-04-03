import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
import { Userreg } from './userreg.model';
   
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
  
@Injectable()  
export class RegisterServiceclass {  
  
  constructor(private http: Http) { }  
  
  registerUser(user:any){      
    return this.http.post('http://localhost:8000/api/registerUser/',user)               
  }  
  
} 