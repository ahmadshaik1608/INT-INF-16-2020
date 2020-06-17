import { Component, OnInit,ViewChild , ElementRef  } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";
import { MyserviceService } from "../../myservice.service";
 
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  view="View More"
  userdata
  showqr=false
  events=[]
  public qrdata: any =[];
  constructor(  public router: Router,
                 private route: ActivatedRoute,
                 private service:MyserviceService) { 
                  this.service.datauaser.subscribe(result=>
                    {
                      console.log(result);
                      
                      this.birthdayToday=result['Todaybdays'];
                     this.bdaycount=this.birthdayToday.length
                     this.testmonialShow=result['message'][0]['testmonial']
                      this.userdata=result['message'][0]
                     if(this.userdata.events.length>0){
                        service.getregisteredevent(this.userdata.events).subscribe(data=>{
                             this.events=data['events']
                        })
                     }
                     this.isGiven=this.testmonialShow
                    //  console.log(this.testmonialShow);
                    if(this.isGiven)
                    {
                      var testmonialdata={'userId':this.userdata['_id']}
                      service.getTestmonial(testmonialdata).subscribe(data=>
                        {
                          console.log(data);
                          
                          this.testmonial=data[0]['testmonial']
                          this.dummytestmonial=this.testmonial
                        })
                    }
                  })
                 }
 testmonial=''
 dummytestmonial=''
 isGiven
 birthdayToday=[]
 bdaycount
 eventsList=[
   {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
   {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
   {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"}
 ]
 testmonialShow
 isEdit
  ngOnInit(): void {
 this.service.datauaser.subscribe(result=>
      {
        this.birthdayToday=result['Todaybdays'];
       this.bdaycount=this.birthdayToday.length
       this.testmonialShow=result['message'][0]['testmonial']
      //  console.log(this.testmonialShow);
       
        
      })
  //  console.log(this.birthdayToday),result['bdays'];
  }

  writetestmonial(){
      this.testmonialShow=true
      this.isEdit=true
  }
  deletetestmonial(){
    this.testmonialShow=false
    this.isGiven=false
    var deletedata={
        'userId':this.userdata['_id']
    }
    this.service.deleteTestmonial(deletedata).subscribe(data=>{
      // console.log(data);
      
    })
  }
  edittestmonial(){
    this.isEdit=true
  }
  cancletestmonial(){
   
    if(this.testmonial=='' && this.isGiven=='false')
    {
      this.testmonialShow=false 
    }
    else if(this.testmonial!='' && this.isGiven=='false' )
    {
      this.testmonialShow=false 
    }
    else{
      this.testmonial=this.dummytestmonial
      this.isEdit=false
    }
  }
  submittestmonial(){
    this.isEdit=false
    this.isGiven=true
    var testmonialdata={
      'userId':this.userdata['_id'],
      'testmonial':this.testmonial,
      'username':this.userdata['Name'],
      'branch':this.userdata['branch'],
      'batch':this.userdata['yop'],
      'profilepic':this.userdata['profilepic']
    }
    // console.log(testmonialdata);
    
    this.service.submitTestmonial(testmonialdata).subscribe((data)=>
    {
      // console.log(data);
      
    })
  }
  viewEvent(event)
  {
    // console.log(event);
    this.router.navigate(['/RegisterEvent',event.id])
    
  }
  getQr()
  {
    this.showqr=true
    this.qrdata = 'Name : '+this.userdata.Name+'\n'+
    'Roll No : '+this.userdata.rollno+'\n'+
   'Email : '+this.userdata.email+'\n'+ 
   'Born On : '+this.userdata.dateofbirth.substr(0,10)+'\n'+
   'Email : '+this.userdata.email+'\n'+
   'Passed Out Year : '+this.userdata.yop+'\n'+
   'Company : '+this.userdata.company+'\n' +
   'Designation : '+this.userdata.designation+'\n' +
   'Location : '+this.userdata.location

  }
}