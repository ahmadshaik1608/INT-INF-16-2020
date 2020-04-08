import { Injectable } from '@angular/core';   
import {HttpClient} from '@angular/common/http'
// import {Http,Response, Headers, RequestOptions } from '@angular/http';   
// import { Userreg } from './userreg.model';
   
import { Observable } from 'rxjs';  
// import 'rxjs/operators/map';
// import 'rxjs/add/operator/do';  
  
@Injectable()  
export class RegisterServiceclass {  
  
   constructor(private http: HttpClient) { }  
  
  registerUser(user:any):Observable<any>{      
    // console.log("service",user)
    return this.http.post<any>('http://localhost:3000/api/registerUser/',user) 
  }  

  register(){
    return this.http.post<any>("http://localhost:3000/api/register/","hi")
  }
  
} 