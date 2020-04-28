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
  newMessage: FormGroup;  
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,
              private serve:MyserviceService) { }
dd=[1,2,3] 
editMessage=false
cratemessage=false
file
  ngOnInit(): void {
    this.newMessage = this.formBuilder.group({
      title:[''],
      name:[''],
      message:[''],
     file: ['']
    });


  }

update(message)
{

}
delete(message)
{

}
create(data)
{
  console.log(data);
  this.newMessage.get('title').setValue(data[0])
  this.newMessage.get('name').setValue(data[1])
  this.newMessage.get('message').setValue(data[2])

  console.log(this.newMessage.value);
  const formData: FormData = new FormData();
  formData.append('file[]', this.file);
  console.log(this.file);
  
  var options = { content: formData };
  console.log(options);
  
  
  this.serve.newaboutus(this.newMessage.value).subscribe(data=>{

  })
  
  
}
onFileSelect(event) {
  if (event.target.files.length > 0) {
   this.file = event.target.files[0];
 
    
    this.newMessage.get('file').setValue(this.file);
   
  
    

  }
}
}
