import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminaboutus',
  templateUrl: './adminaboutus.component.html',
  styleUrls: ['./adminaboutus.component.css']
})
export class AdminaboutusComponent implements OnInit {
  newMessage: FormGroup;  
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
dd=[1,2,3] 
editMessage=false
cratemessage=false
  ngOnInit(): void {
    this.newMessage = this.formBuilder.group({
      title:[''],
      name:[''],
      message:[''],
      profile: ['']
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
 
  console.log(this.newMessage);
  
  
}
onFileSelect(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.newMessage.get('profile').setValue(file);
  }
}
}
