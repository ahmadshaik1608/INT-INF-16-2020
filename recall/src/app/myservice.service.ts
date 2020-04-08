import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';  
import { User } from './user.model';

interface myData{
  success:boolean,
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  LoggedInStatus = false
  constructor(private http:HttpClient) { }
 
   setLoggedIn(value:boolean){
     this.LoggedInStatus = value
     console.log(this.isLoggedIn)
   }

   get isLoggedIn()
   {
     return this.LoggedInStatus
   }
  validateLogin(user:User){      
    return this.http.post('http://localhost:3000/api/loginUser/',{
        username:user.username,
    password:user.password})               
  }  
    
  registerUser(user:any):Observable<any>{      
    // console.log("service",user)
    return this.http.post<any>('http://localhost:3000/api/registerUser/',user) 
  }  

  register(){
    return this.http.post<any>("http://localhost:3000/api/register/","hi")
  }
}