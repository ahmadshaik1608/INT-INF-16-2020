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
    this.datauaser= this.http.post('api/loginUser/',{
        username:user.username,
        password:user.password})   
    localStorage.setItem('user', this.datauaser.message)
    localStorage.setItem("Admin",this.datauaser.isAdmin)
    console.log(localStorage.getItem('user'));
    return this.datauaser          
  }  
    getlogin(data)
    {
      this.datauaser= this.http.post('api/userdata/',data)   
    }
  registerUser(user:any):Observable<any>{      
    // console.log("service",user)
    return this.http.post<any>('api/registerUser/',user) 
  }  

  register(){
    return this.http.post<any>("api/register/","hi")
  }

  updateProfile(user:any)
  {
    return this.http.post<any>("api/updateuser/",user)
  }

  searchalumni(jskey)
  {
    return this.http.post<any>("api/searchalumni/",jskey)
  }

  uploadprofilepic(data)
  {
    console.log("hello");
    
    return this.http.post<any>("api/upoadprofile/",data)
  }
  submitTestmonial(data)
  {
    return this.http.post<any>("api/testmonial/",data)
  }
  getTestmonial(data)
  {
    console.log(data);
    return this.http.post<any>("api/gettestmonial/",data)
  }
  deleteTestmonial(data)
  {
    return this.http.post<any>("api/deletetestmonial/",data)
  }
 
  updatecontactus(data)
  {
      return this.http.post<any>("api/updatecontact",data);
  }

  // Gallary
  addfolder(foldername){
    console.log(foldername)
      this.http.post<any>('gallery/createfolder',{foldername:foldername}).subscribe((data)=>{
          console.log(data,1234)
          this.folder.push(data)
          this.folderupdated.next([...this.folder])
      })
  
  }
  
  getfolderupdated(){
    return this.folderupdated.asObservable()
  }
  getfolder(){
    this.http.get<any>('gallery/getfolder').subscribe((data)=>{
     this.folder=[]
      for(let i=0;i<data.length;i++){
       
        this.folder.push(data[i])
      }
      return this.folderupdated.next([...this.folder])
    })
  }
  
  deletefolder(id){
    this.http.delete<any>('gallery/deletefolder'+id).subscribe((result)=>{
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
    this.http.post<any>('file',formdata).subscribe((data)=>{
      console.log(data.imagepath)
      this.images.push(data.imagepath)
      this.imagesupdated.next([...this.images])
  });
  
  }
  
  displayimages(id){
    this.images=[]
    this.http.get<any>('gallery/dispalyimages'+id).subscribe(data=>{
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
    this.http.post<any>('gallery/thumbnail',params).subscribe(data=>{
      
    })
    
  }
  
  deleteimage(id,img){
    var params={id:id,img:img}
    this.http.delete<any>('gallery/deleteimage',{params}).subscribe(data=>{
      this.images=this.images.filter(imagepath=>imagepath!==img)
      this.imagesupdated.next([...this.images])
      console.log(data)
    })
    
  }
//Gallary  

approvalbyadmin(data){
    return this.http.post<any>('api/approveunapproveuser',data)
 }
 getcontact()
 {
   return this.http.get<any>('api/contactus')
 }
 getchapters(){
  return this.http.get<any>('api/chaptersdata')
 }
 promote(data){
   console.log(data);
   return this.http.post<any>('api/promotedemote',data)
 }
 demote(data){
  console.log(data);
  
return this.http.post<any>('api/promotedemote',data)
}




registerEvent(userId,eventId)
{
 var id={
    eid:eventId,
    uid:userId
  }
  return this.http.post<any>('api/registerEvent',id)
}
getregisteredevent(data)
{
  var Edata={
      ids:data
  }
  return this.http.post<any>('api/getregisteredevent',Edata)
}
postnotification(data)
{
  return this.http.post<any>('api/notification',data)
}
selectalumni(data1){
  var data={
    searchkey:data1
  }
  return this.http.post<any>('api/selectuser',data)
}
sendMail(data)
{
  return this.http.post<any>('api/sendMail',data)
}
updateAdmindetails(data)
{
  return this.http.post<any>('api/updateAdmin',data)
}
getalladmins()
{
  return this.http.get<any>("api/getAdmins")
}
grantAsadmin(data)
{
  return this.http.post<any>('api/makeAdmin',data)
                       
}
removeAsadmin(data)
{
  return this.http.post<any>('api/deleteAdmin',data)
}
deleteNotifications(data)
{
  return this.http.post<any>('api/deleteNotifications',data)
}
createNewChapter(data)
{
  return this.http.post<any>('api/createchapter',data)
}
postComment(data)
{
  return this.http.post<any>('api/postComment',data)
}
getComments()
{
  return this.http.get<any>("api/getComment") 
}
sendCommentReply(data)
{
  return this.http.post<any>("api/sendCommentReply",data) 
}
joinChapter(data)
{
  return this.http.post<any>("api/joinChapter",data) 
}
leaveChapter(data)
{
  return this.http.post<any>("api/leaveChapter",data) 
}
createChapterEvent(data)
{
  return this.http.post<any>("api/chapterevent",data) 
}
updateChapter(data)
{
  return this.http.post<any>("api/updateChapter",data) 
}
updateChapterImage(data)
{
  return this.http.post<any>("api/updateChapterImage",data) 
}
deleteChapter(data)
{
  return this.http.post<any>("api/deleteChapter",data) 
}

// ---------------------------------ADMIN-------------------------------

getUsers(associate:any):Observable<any>
{
  return this.http.post<any>("api/getusers/",{associates:associate})
}
getevents()
{
return this.http.get<any>('api/getevents')
}
createevent(data)
{
  return this.http.post<any>('api/createevent',data)
}
updateevent(data)
{
  return this.http.post<any>('api/updateevent',data)
}
deleteevent(data)
{
  return this.http.post<any>('api/deleteevents',data)
}
getabutus()
{
  return this.http.get<any>('api/aboutus')
}
newaboutus(data)
{
 return this.http.post<any>('api/newaboutus',data)
}
updateaboutus(data)
{
  return this.http.post<any>('api/updateaboutus',data)
}
deleteaboutus(data)
{
  return this.http.post<any>('api/deleteaboutus',data) 
}
getAlltestmonials(){
  return this.http.get<any>("api/getalltestmonials/");
}
approveUnapprove(data){
  return this.http.post<any>('api/approveunapprove',data)
}
postjob(data)
{
  return this.http.post<any>("api/postjob/",data)
}
getAlljobs()
{
  return this.http.get<any>("api/getjobs/");
}
deletejob(data){
  return this.http.post<any>("api/deletejob/",data);
}
gethof()
 {
  return this.http.get<any>('api/gethof')
 }
 deletehof(data)
 {
   return this.http.post<any>('api/deletehof',data)
 }
 posthof(data){
  return this.http.post<any>('api/posthof',data)
 }
getlogo()
{
  return this.http.get<any>('api/getlogos')
}
updatelogo(data){
  return this.http.post<any>('api/updatelogo',data)
 }
 createNewProfile(data)
 {
  return this.http.post<any>('api/createprofile',data)
 }
 getProfiles()
 {
  return this.http.get<any>('api/getprofiles')
 }
 updateProfiles(data)
 {
  return this.http.post<any>('api/updateprofile',data)
 }
 deleteProfiles(data)
 {
  return this.http.post<any>('api/deleteprofile',data)
 }
updateSocialsites(data)
{
  return  this.http.post<any>('api/updatesocialsites',data)
}
getSocialSites()
 {
  return this.http.get<any>('api/getsocialsites')
 }
 addInstitute(data)
 {
  return  this.http.post<any>('api/addinstitute',data)
 }
 addBranch(data)
 {
  return  this.http.post<any>('api/addbranch',data)
 }
 removeBranch(data)
 {
  return  this.http.post<any>('api/removebranch',data)
 }
 removeInst(data)
 {
  return  this.http.post<any>('api/removeinstitute',data)
 }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    localStorage.removeItem('role')
    }   
}

// http://localhost:3000/