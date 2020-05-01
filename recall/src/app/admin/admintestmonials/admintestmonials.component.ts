import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-admintestmonials',
  templateUrl: './admintestmonials.component.html',
  styleUrls: ['./admintestmonials.component.css']
})
export class AdmintestmonialsComponent implements OnInit {
  loading=true
approved
unapproved
testmonials
  constructor(private serve:MyserviceService) {
    serve.getAlltestmonials().subscribe((data)=>{
      this.approved=data['approved']
     this.unapproved=data['unapproved']
     this.testmonials=this.approved
     this.loading=false
    })
   }
  step='step1'
  tlist=[1,2,3,4,5,6,7,8,0,0]
  ngOnInit(): void {
    
  }
  approve(approvetestmonial)
  {
    this.loading=true
   var data={
      'id':approvetestmonial._id,
      'isvalid':'true'
    }
    this.serve.approveUnapprove(data).subscribe((data)=>{
      this.approved=data['approved']
      this.unapproved=data['unapproved']
      this.testmonials=this.approved
      this.loading=false
    })
    console.log(approvetestmonial);
    
  }
  disapprove(approvetestmonial)
  {
    this.loading=true
   var data={
      'id':approvetestmonial._id,
      'isvalid':'false'
    }
    this.serve.approveUnapprove(data).subscribe((data)=>{
      this.approved=data['approved']
      this.unapproved=data['unapproved']
      this.testmonials=this.approved
      this.loading=false
    })
    console.log(approvetestmonial);
    
  }

}
