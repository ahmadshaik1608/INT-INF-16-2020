import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';  
import { User } from './user.model';
import { Subject } from "rxjs";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';

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
  private _adminsList$ = new Subject<void>()
  private images=[]
  constructor(private http:HttpClient,private form : FormBuilder) { }
 
  get adminsList$()
    {
          return this._adminsList$
    }
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
    getlogin(data)
    {
      this.datauaser= this.http.post('http://localhost:3000/api/userdata/',data)   
    }
  registerUser(user:any):Observable<any>{      
    // console.log("service",user)
    return this.http.post<any>('http://localhost:3000/api/registerUser/',user) 
  }  

  register(){
    return this.http.post<any>("http://localhost:3000/api/register/","hi")
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
 
  updatecontactus(data)
  {
      return this.http.post<any>("http://localhost:3000/api/updatecontact",data);
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
  thumbnail(id,img){
    var params={id:id,img:img}
    this.http.post<any>('http://localhost:3000/gallery/thumbnail',params).subscribe(data=>{
      
    })
    
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

approvalbyadmin(data){
    return this.http.post<any>('http://localhost:3000/api/approveunapproveuser',data)
 }
 getcontact()
 {
   return this.http.get<any>('http://localhost:3000/api/contactus')
 }
 getchapters(){
  return this.http.get<any>('http://localhost:3000/api/chaptersdata')
 }
 promote(data){
   console.log(data);
   return this.http.post<any>('http://localhost:3000/api/promotedemote',data)
 }
 demote(data){
  console.log(data);
  
return this.http.post<any>('http://localhost:3000/api/promotedemote',data)
}




registerEvent(userId,eventId)
{
 var id={
    eid:eventId,
    uid:userId
  }
  return this.http.post<any>('http://localhost:3000/api/registerEvent',id)
}
getregisteredevent(data)
{
  var Edata={
      ids:data
  }
  return this.http.post<any>('http://localhost:3000/api/getregisteredevent',Edata)
}
postnotification(data)
{
  return this.http.post<any>('http://localhost:3000/api/notification',data)
}
selectalumni(data1){
  var data={
    searchkey:data1
  }
  return this.http.post<any>('http://localhost:3000/api/selectuser',data)
}
sendMail(data)
{
  return this.http.post<any>('http://localhost:3000/api/sendMail',data)
}
updateAdmindetails(data)
{
  return this.http.post<any>('http://localhost:3000/api/updateAdmin',data)
}
getalladmins()
{
  return this.http.get<any>("http://localhost:3000/api/getAdmins")
}
grantAsadmin(data)
{
  return this.http.post<any>('http://localhost:3000/api/makeAdmin',data)
                       
}
removeAsadmin(data)
{
  return this.http.post<any>('http://localhost:3000/api/deleteAdmin',data)
}
deleteNotifications(data)
{
  return this.http.post<any>('http://localhost:3000/api/deleteNotifications',data)
}
createNewChapter(data)
{
  return this.http.post<any>('http://localhost:3000/api/createchapter',data)
}
postComment(data)
{
  return this.http.post<any>('http://localhost:3000/api/postComment',data)
}
getComments()
{
  return this.http.get<any>("http://localhost:3000/api/getComment") 
}
sendCommentReply(data)
{
  return this.http.post<any>("http://localhost:3000/api/sendCommentReply",data) 
}
joinChapter(data)
{
  return this.http.post<any>("http://localhost:3000/api/joinChapter",data) 
}
leaveChapter(data)
{
  return this.http.post<any>("http://localhost:3000/api/leaveChapter",data) 
}
createChapterEvent(data)
{
  return this.http.post<any>("http://localhost:3000/api/chapterevent",data) 
}
updateChapter(data)
{
  return this.http.post<any>("http://localhost:3000/api/updateChapter",data) 
}
updateChapterImage(data)
{
  return this.http.post<any>("http://localhost:3000/api/updateChapterImage",data) 
}
deleteChapter(data)
{
  return this.http.post<any>("http://localhost:3000/api/deleteChapter",data) 
}

// ---------------------------------ADMIN-------------------------------

getUsers(associate:any):Observable<any>
{
  return this.http.post<any>("http://localhost:3000/api/getusers/",{associates:associate})
}
getevents()
{
return this.http.get<any>('http://localhost:3000/api/getevents')
}
createevent(data)
{
  return this.http.post<any>('http://localhost:3000/api/createevent',data)
}
updateevent(data)
{
  return this.http.post<any>('http://localhost:3000/api/updateevent',data)
}
deleteevent(data)
{
  return this.http.post<any>('http://localhost:3000/api/deleteevents',data)
}
getabutus()
{
  return this.http.get<any>('http://localhost:3000/api/aboutus')
}
newaboutus(data)
{
 return this.http.post<any>('http://localhost:3000/api/newaboutus',data)
}
updateaboutus(data)
{
  return this.http.post<any>('http://localhost:3000/api/updateaboutus',data)
}
deleteaboutus(data)
{
  return this.http.post<any>('http://localhost:3000/api/deleteaboutus',data) 
}
getAlltestmonials(){
  return this.http.get<any>("http://localhost:3000/api/getalltestmonials/");
}
approveUnapprove(data){
  return this.http.post<any>('http://localhost:3000/api/approveunapprove',data)
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
gethof()
 {
  return this.http.get<any>('http://localhost:3000/api/gethof')
 }
 deletehof(data)
 {
   return this.http.post<any>('http://localhost:3000/api/deletehof',data)
 }
 posthof(data){
  return this.http.post<any>('http://localhost:3000/api/posthof',data)
 }
getlogo()
{
  return this.http.get<any>('http://localhost:3000/api/getlogos')
}
updatelogo(data){
  return this.http.post<any>('http://localhost:3000/api/updatelogo',data)
 }
 createNewProfile(data)
 {
  return this.http.post<any>('http://localhost:3000/api/createprofile',data)
 }
 getProfiles()
 {
  return this.http.get<any>('http://localhost:3000/api/getprofiles')
 }
 updateProfiles(data)
 {
  return this.http.post<any>('http://localhost:3000/api/updateprofile',data)
 }
 deleteProfiles(data)
 {
  return this.http.post<any>('http://localhost:3000/api/deleteprofile',data)
 }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    localStorage.removeItem('role')
    }   
}
