import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-adminalumnichapters',
  templateUrl: './adminalumnichapters.component.html',
  styleUrls: ['./adminalumnichapters.component.css']
})
export class AdminalumnichaptersComponent implements OnInit {

chapters
showchapter
coordinators
members
totalcount
selectedcapter
  constructor(private serve:MyserviceService) {
      serve.getchapters().subscribe(data=>{
        this.chapters=data['chapters']
        console.log(this.chapters);
        
      })
   }
n=[1,2,3,4]
  ngOnInit(): void {
  }
  showchapterdata(data)
  {
    this.selectedcapter=data['_id']
    this.totalcount=data['coordinators'].length+data['members'].length
    this.showchapter=true
    this.coordinators=data['coordinatorsdata']
    this.members=data['membersdata']
    
  }
 promote(member)
 {
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
      
    })

 }
 demote(coordinator){
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

  })
 }
}
