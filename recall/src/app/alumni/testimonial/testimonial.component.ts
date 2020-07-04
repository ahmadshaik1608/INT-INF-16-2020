import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
// import { Serviceclass } from './service';
// import {Headers,Http,Response,RequestOptions} from '@angular/http'
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
approved=[]
testmonials=[]
n=[1,2,3]
  constructor(private serve:MyserviceService) { 
    serve.getAlltestmonials().subscribe((data)=>{
    console.log(data);
    
      this.approved=data['approved']
     this.testmonials=this.approved
     console.log(this.testmonials);
     
    //  this.loading=false
    })
    }  
  Repdata;  
  valbutton ="Save";  
  
  
ngOnInit() {    
//  this.newService.GetUser().subscribe(data =>  this.Repdata = data)  
}  
 
onSave = function(user,isValid: boolean) {    
user.mode= this.valbutton;  
 this.newService.saveUser(user)  
 .subscribe(data =>  {  alert(data.data);  
      
   this.ngOnInit();    
 }   
 , error => this.errorMessage = error )  
   
}      
edit = function(kk) {  
this.id = kk._id;  
this.name= kk.name;  
this.address= kk.address;  
this.valbutton ="Update";  
}  
 
delete = function(id) {  
this.newService.deleteUser(id)  
.subscribe(data =>   { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error )   
} 
}
