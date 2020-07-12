import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-adminalumnichapters',
  templateUrl: './adminalumnichapters.component.html',
  styleUrls: ['./adminalumnichapters.component.css']
})
export class AdminalumnichaptersComponent implements OnInit {
  loading=true
chapters
showchapter
coordinators
members
totalcount
createchapter=false
selectedchapter
selectedchapterId
showCreate=true
imageToupload
scname
events
file
successMsg
errorMsg
imageSuccess
updateChapter:FormGroup
  constructor(private serve:MyserviceService,private formBuilder:FormBuilder) {
      serve.getchapters().subscribe(data=>{
        this.chapters=data['chapters']
        console.log(this.chapters);
        this.loading=false
      })
   }
n=[1,2,3,4]
  ngOnInit(): void {
  

  }
  showchapterdata(data)
  {
    this.selectedchapter=data
    this.selectedchapterId=data['_id']
    this.scname=data['chaptername']
    this.totalcount=data['coordinators'].length+data['members'].length
    this.showchapter=true
    this.coordinators=data['coordinatorsData']
    this.members=data['membersData']
    this.events=data['eventsData']
    
    this.updateChapter=this.formBuilder.group({
      chaptername:[this.scname,[ Validators.required,Validators.minLength(3)]],
      chapterlocation:[this.selectedchapter.location,[ Validators.required]],
      description:[this.selectedchapter.description,[ Validators.required]],
      chaptermail:[this.selectedchapter.chaptermail,[ Validators.required]],
      chapterphone:[this.selectedchapter.chapterphone,[ Validators.required]],
    })
  }
 promote(member)
 {
   this.loading=true
    var memdata={
      'id':this.selectedchapterId,
      'type':'P',
      'demote': {'members':member['_id']},
      'promote' : {'coordinators':member['_id']},
    }
    console.log(memdata);
    
    this.serve.promote(memdata).subscribe((data)=>{

      for (var i = 0; i < this.members.length; i++){
        // look for the entry with a matching `code` value
        if(this.members[i]['_id'].toString()==member['_id']){
          this.coordinators.push(this.members[i])
          this.members.splice(i,1)
       
        }

      }
      this.loading=false      
    })

 }

 create(name,location,description,mail,contact)
 {
   this.loading=true
 if(this.file!=null && name!=null && location!=null && description!=null && mail!=null && contact!=null ){
  var formData = new FormData();
  formData.append('file', this.file);
  formData.append('name',name);
  formData.append('location',location)
  formData.append('description',description)
  formData.append('mail',mail);
  formData.append('contact',contact)
  console.log(formData);
 

  this.serve.createNewChapter(formData).subscribe(data=>{
    if(data['status']=='ok')
    {
      this.chapters=data['chaptersData']
      console.log("hello",this.chapters)
       this.createchapter=false
       this.loading=false
    }
  })
 }
 else{
  this.errorMsg=true
 }
  
  
 }

 demote(coordinator){
  this.loading=true
  var memdata={
    'id':this.selectedchapterId,
    'type':'D',
    'promote': {'members':coordinator['_id']},
    'demote' : {'coordinators':coordinator['_id']},
  }

  console.log(memdata);
  
  this.serve.demote(memdata).subscribe(data=>{
    
    for (var i = 0; i < this.coordinators.length; i++){
      // look for the entry with a matching `code` value
      if(this.coordinators[i]['_id'].toString()==coordinator['_id']){
        this.members.push(this.coordinators[i])
        this.coordinators.splice(i,1)

      }

    }
    this.loading=false
  })
 }
 onFileSelect(event) {
  if (event.target.files.length > 0) {
   this.file = event.target.files[0];
  }
}

onImageSelect(event) {
  if (event.target.files.length > 0) {
   this.imageToupload = event.target.files[0];
  }
}

updateImage()
{
  const formData: FormData = new FormData();
  formData.append('file', this.imageToupload);
  formData.append('id',this.selectedchapterId);
  formData.append('type','Chapter');
  this.serve.updateChapterImage(formData).subscribe(data=>{
    console.log(data);
    
    if(data['status']='ok')
    {
      this.chapters=data['chaptersData']
      this.imageSuccess=true
     
    }
         

  })
}
updateData(data)
{
  if(this.updateChapter.valid)
  {
    var Updatedata={    
      id:this.selectedchapterId,
      data:data
  }
  this.successMsg=true
    this.serve.updateChapter(Updatedata).subscribe(data=>{
      if(data['status']='ok')
      {
        this.chapters=data['chaptersData']
        this.successMsg=true
      }
    })
    
  }
  else{
    this.errorMsg=true
  }
   
}
delete()
{
  this.serve.deleteChapter({id:this.selectedchapterId}).subscribe(data=>{
    if(data['status']='ok')
    {
      this.chapters=data['chaptersData']
      this.showchapter=false
    }
  })
}
FadeOutMsg() {
  setTimeout( () => {
        this.errorMsg=false
         this.successMsg = false;
         this.imageSuccess=false
      }, 4000);
 }
}


