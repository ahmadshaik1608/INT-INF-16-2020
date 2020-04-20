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
  bgcolors=['#DC143C','black','#003152']
  datauaser:any
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
    this.datauaser= this.http.post('http://localhost:3000/api/loginUser/',{
        username:user.username,
        password:user.password})     
    localStorage.setItem('user', this.datauaser.message)
    console.log(localStorage.getItem('user'));
    
    return this.datauaser          
  }  
    
  registerUser(user:any):Observable<any>{      
    // console.log("service",user)
    return this.http.post<any>('http://localhost:3000/api/registerUser/',user) 
  }  

  register(){
    return this.http.post<any>("http://localhost:3000/api/register/","hi")
  }

  getUsers(associate:any):Observable<any>
  {
    return this.http.post<any>("http://localhost:3000/api/getusers/",{associates:associate})
  }

  updateProfile(user:any)
  {
    return this.http.post<any>("http://localhost:3000/api/updateuser/",user)
  }

  searchalumni(jskey)
  {
    return this.http.post<any>("http://localhost:3000/api/searchalumni/",jskey)
  }

  uploadprofilepic(data)
  {
    console.log("hello");
    
    return this.http.post<any>("http://localhost:3000/api/upoadprofile/",data)
  }
  submitTestmonial(data)
  {
    return this.http.post<any>("http://localhost:3000/api/testmonial/",data)
  }
  getTestmonial(data)
  {
    console.log(data);
    return this.http.post<any>("http://localhost:3000/api/gettestmonial/",data)
  }
  deleteTestmonial(data)
  {
    return this.http.post<any>("http://localhost:3000/api/deletetestmonial/",data)
  }
  postjob(data)
  {
    return this.http.post<any>("http://localhost:3000/api/postjob/",data)
  }
  getAlljobs()
  {
    return this.http.get<any>("http://localhost:3000/api/getjobs/");
  }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    }   
}
