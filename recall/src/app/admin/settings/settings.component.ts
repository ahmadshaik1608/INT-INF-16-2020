import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  searchTerm = new Subject<string>();
  resultSet=null
  search=null
  searchText
  selectedMember=false
  Member
  constructor(private service:MyserviceService) { 

    this.searchTerm.pipe(
      debounceTime(1000))
      .subscribe(value => {
       if(value.length!=0){
        service.selectalumni(value).subscribe(data=>{
          this.resultSet=data
          this.search=true
        })
      }
      else{
        this.resultSet=[]
        this.search=false
      }
      });
   }
firstName
email
password
notUpdated
createnew
dummy=[1,2,3,4]
  ngOnInit(): void {
  }
updateProfile()
{

}
select(id)
{
  this.selectedMember=true
 
  this.service.searchalumni({_id:id._id}).subscribe(data=>{
    this.Member=data[0]
    console.log(this.Member);
    
  })
}
}
