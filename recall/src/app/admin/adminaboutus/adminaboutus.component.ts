import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Server } from 'http';
import { MyserviceService } from 'app/myservice.service';
import { ToastrService } from 'ngx-toastr';


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
              private serve:MyserviceService,private toastr: ToastrService) { 
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
errorMsg=false
successmsg=false
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
  if(this.file!=null && data[0]!=null && data[1]!=null&& data[2][0]!=null)
  {this.loading=true
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
        this.messages=data['messages']
        this.created=true
        this.loading=false
        this.cratemessage=false
        this.showSuccess("Message Creted Succsfully")
      }
  })
  }
  else{
    this.errorMsg=true;
    this.FadeOutMsg()
  }
  
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
        this.messages=data['messages']
        this.updatedsuccess=true
        this.loading=false
        this.editMessage=false
        this.showSuccess("Message Updated Succsfully")
      }
  })
  
  
}
onFileSelect(event) {
  if (event.target.files.length > 0) {
   this.file = event.target.files[0];
  }
}
FadeOutMsg() {
  setTimeout( () => {
        this.errorMsg=false
        this.successmsg = false;
      }, 4000);
 }
 showSuccess(message){
  this.toastr.success(message,'',{ closeButton:true})
}
showError(message){
  this.toastr.error(message,'',{ closeButton:true})
}
}
