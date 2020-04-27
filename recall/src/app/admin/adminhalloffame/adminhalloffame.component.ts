import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-adminhalloffame',
  templateUrl: './adminhalloffame.component.html',
  styleUrls: ['./adminhalloffame.component.css']
})
export class AdminhalloffameComponent implements OnInit {

  keysearch
  noAlumni
  selectedsearch
  alumnidata
  constructor(private serve:MyserviceService) { }

  ngOnInit(): void {
  }
  searchalumni(key)
  {
    this.selectedsearch='rollno'
    this.noAlumni=false
    var jskey={}
    this.keysearch=key
    jskey[this.selectedsearch]=key
    
    this.serve.searchalumni(jskey).subscribe(data=>
      {
      this.alumnidata=data[0]
        console.log(data[0]);
        
      })
    
  }
}
