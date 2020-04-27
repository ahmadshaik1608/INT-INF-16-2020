import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';  
import { User } from './user.model';
import { Subject } from "rxjs";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface myData{
  success:boolean,
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  isAdmiN
  LoggedInStatus = false
  bgcolors=['#DC143C','black','#003152']
  datauaser:any
  private folder=[]
  
  private folderupdated=new Subject()
  private imagesupdated=new Subject()
  private images=[]
  constructor(private http:HttpClient,private form : FormBuilder) { }
 
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
    localStorage.setItem("Admin",this.datauaser.isAdmin)
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
  deletejob(data){
    return this.http.post<any>("http://localhost:3000/api/deletejob/",data);
  }
  getAlltestmonials(){
    return this.http.get<any>("http://localhost:3000/api/getalltestmonials/");
  }
  updatecontactus(data)
  {
      return this.http.post<any>("http://localhost:3000//api/updatecontact",data);
  }

  // Gallary
  addfolder(foldername){
    console.log(foldername)
      this.http.post<any>('http://localhost:3000/gallery/createfolder',{foldername:foldername}).subscribe((data)=>{
          console.log(data,1234)
          this.folder.push(data)
          this.folderupdated.next([...this.folder])
      })
  
  }
  
  getfolderupdated(){
    return this.folderupdated.asObservable()
  }
  getfolder(){
    this.http.get<any>('http://localhost:3000/gallery/getfolder').subscribe((data)=>{
   
      for(let i=0;i<data.length;i++){
       
        this.folder.push(data[i])
      }
      return this.folderupdated.next([...this.folder])
    })
  }
  
  deletefolder(id){
    this.http.delete<any>('http://localhost:3000/gallery/deletefolder'+id).subscribe((result)=>{
      const updated=this.folder.filter(folder=>folder._id!==id)
      this.folder=updated
      this.folderupdated.next([...this.folder])
      this.images=[]
      this.imagesupdated.next([...this.images])
    })
  }
  
  addimages(img,id){
  
    const formdata=new FormData();
    formdata.append('file',img);
    formdata.append('id',id)
    this.http.post<any>('http://localhost:3000/file',formdata).subscribe((data)=>{
      console.log(data.imagepath)
      this.images.push(data.imagepath)
      this.imagesupdated.next([...this.images])
  });
  
  }
  
  displayimages(id){
    this.images=[]
    this.http.get<any>('http://localhost:3000/gallery/dispalyimages'+id).subscribe(data=>{
      for(let i=0;i<data.photopath.length;i++){this.images.push(data.photopath[i])}
      this.imagesupdated.next([...this.images])
    })
  }
  
  getimagesupdated(){
    //console.log("getimages")
    return this.imagesupdated.asObservable()
  }
  
  deleteimage(id,img){
    var params={id:id,img:img}
    this.http.delete<any>('http://localhost:3000/gallery/deleteimage',{params}).subscribe(data=>{
      this.images=this.images.filter(imagepath=>imagepath!==img)
      this.imagesupdated.next([...this.images])
      console.log(data)
    })
    
  }
//Gallary  
 approveUnapprove(data){
   return this.http.post<any>('http://localhost:3000/api/approveunapprove',data)
 }
approvalbyadmin(data){
    return this.http.post<any>('http://localhost:3000/api/approveunapproveuser',data)
 }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    }   
}
