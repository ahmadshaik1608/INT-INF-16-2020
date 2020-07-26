import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminhalloffame',
  templateUrl: './adminhalloffame.component.html',
  styleUrls: ['./adminhalloffame.component.css']
})
export class AdminhalloffameComponent implements OnInit {
 loading=true
  keysearch
  givehof=false
  noAlumni=false
  selectedsearch
  alumnidata
  searched
  allHof=[]
  constructor(private serve:MyserviceService,private toastr: ToastrService) { 
    serve.gethof().subscribe(data=>{
      this.allHof=data['alumni']
      this.loading=false
      
    })
  }

  ngOnInit(): void {
  }
  searchalumni(key)
  {
    this.loading=true
    this.selectedsearch='rollno'
    this.noAlumni=false
    var jskey={}
    this.keysearch=key
    jskey[this.selectedsearch]=key
    
    this.serve.searchalumni(jskey).subscribe(data=>
      {
        if(data.length>0){
          this.noAlumni=false
         this.alumnidata=data[0]
        }
      else
        this.noAlumni=true
        
      })
   this.loading=false
  }
  posthof(year,description)
  {
    var newdata={
      'name':this.alumnidata['Name'],
      'batch':this.alumnidata['yop'],
      'rollno':this.alumnidata['rollno'],
      'branch':this.alumnidata['branch'],
      'institution':this.alumnidata['institution'],
      'designation':this.alumnidata['designation'],
      'company':this.alumnidata['company'],
      'description':description,
      'location':this.alumnidata['location'],
      'hofyear':year,
      'profilepic':this.alumnidata['profilepic']
    }
    this.serve.posthof(newdata).subscribe((data)=>{
      if(data.status=='ok')
      {  
        this.allHof=data['alumni']
        this.givehof=false
        this.searched=false
      }
    })
    
  }
  deletehof(alumnidata)
  {
    var data={
      'id':alumnidata['_id']
    }
    this.serve.deletehof(data).subscribe((data)=>
    {
      this.allHof=data['alumni']
    })

  }
  showSuccess(message){
    this.toastr.success(message,'',{ closeButton:true})
  }
  showError(message){
    this.toastr.error(message,'',{ closeButton:true})
  }
}
