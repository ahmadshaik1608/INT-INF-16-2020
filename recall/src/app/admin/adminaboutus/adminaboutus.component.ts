import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Server } from 'http';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-adminaboutus',
  templateUrl: './adminaboutus.component.html',
  styleUrls: ['./adminaboutus.component.css']
})
export class AdminaboutusComponent implements OnInit {
  loading=true
  newMessage: FormGroup;  
  updatedsuccess
  messages
  created=false
  updatemessage
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,
              private serve:MyserviceService) { 
                serve.getabutus().subscribe(data=>{
                   this.messages=data['messages']
                   console.log(this.messages);
                   
                })
                this.loading=false
              }
dd=[1,2,3] 
editMessage=false
cratemessage=false
file
  ngOnInit(): void {
   

  }
id
update(message)
{
  this.id=message['_id']
this.updatemessage=message
}
delete(message)
{
  this.loading=true
   var data={
    id:message['_id']
   }
   this.serve.deleteaboutus(data).subscribe(data=>{
    this.messages=data['messages']
    this.loading=false
   })
}
create(data)
{
  this.loading=true
  console.log(data);
  var formData = new FormData();
   formData.append('file', this.file);
  formData.append('title',data[0])
  formData.append('name',data[1])
  formData.append('message1',data[2][0])
  formData.append('message2',data[2][1])
  formData.append('message3',data[2][2])
  formData.append('message4',data[2][3])
  console.log(data[2][1]);
  

  this.serve.newaboutus(formData).subscribe(data=>{
      if(data['status']=='ok')
      {
        this.created=true
        this.loading=false
      }
  })
  
  
}
updateofmessage(data)
{
  this.loading=true
  console.log(data);
  data={
    'id':this.id,
    'title':data[0],
    'name':data[1],
    'message1':data[2][0],
    'message2':data[2][1],
    'message3':data[2][2],
    'message4':data[2][3],
  }


  

  this.serve.updateaboutus(data).subscribe(data=>{
      if(data['status']=='ok')
      {
        this.updatedsuccess=true
        this.loading=false
      }
  })
  
  
}
onFileSelect(event) {
  if (event.target.files.length > 0) {
   this.file = event.target.files[0];
  }
}
}
