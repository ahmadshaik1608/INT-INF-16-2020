import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';


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
selectedcapter
showCreate=true
scname
file
  constructor(private serve:MyserviceService) {
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
    this.selectedcapter=data['_id']
    this.scname=data['chaptername']
    this.totalcount=data['coordinators'].length+data['members'].length
    this.showchapter=true
    this.coordinators=data['coordinatorsData']
    this.members=data['membersData']
    
  }
 promote(member)
 {
   this.loading=true
    var memdata={
      'id':this.selectedcapter,
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

 create(data)
 {
   this.loading=true
 if(this.file!=null && data!=null){
  var formData = new FormData();
  formData.append('file', this.file);
  formData.append('name',data)
  console.log(formData);
 

  this.serve.createNewChapter(formData).subscribe(data=>{
    if(data['status']=='ok')
    {
      this.chapters=data['chapters']
       this.createchapter=false
      this.loading=false
    }
  })
 }
 else{
   console.log("**********Error**********");
   
 }
  
  
 }

 demote(coordinator){
  this.loading=true
  var memdata={
    'id':this.selectedcapter,
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
}
