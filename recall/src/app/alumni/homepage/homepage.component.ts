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
  ncount=0
  gotdata=false
  loading=true
  public qrdata: any =[];
  constructor(  public router: Router,
                 private route: ActivatedRoute,
                 private service:MyserviceService) { 

                  this.service.datauaser.subscribe(result=>
                    {         
                      console.log(result);
                      this.birthdayToday=result['Todaybdays'];
                     this.bdaycount=this.birthdayToday.length
                     
                     if(result['notifications'].length>0)
                           this.ncount=result['notifications'][0]['messages'].length
                     console.log(this.ncount);
                     
                     this.testmonialShow=result['message'][0]['testmonial']
                     this.userdata=result['message'][0]
                    
                      
                     if(this.userdata.events.length>0){
                        this.service.getregisteredevent(this.userdata.events).subscribe(data=>{
                             this.events=data['events']
                        })
                     }
                     this.isGiven=this.testmonialShow
                    //  console.log(this.testmonialShow);
                    if(this.isGiven)
                    {
                      var testmonialdata={'userId':this.userdata['_id']}
                      this.service.getTestmonial(testmonialdata).subscribe(data=>
                        {
                          console.log(data);
                          
                          this.testmonial=data[0]['testmonial']
                          this.dummytestmonial=this.testmonial
                        })
                    }
                  })
                
                   this.loading=false
      }

 testmonial=''
 dummytestmonial=''
 isGiven
 birthdayToday=[]
 bdaycount

 testmonialShow
 isEdit
  ngOnInit(): void {
    this.loading=true
 this.service.datauaser.subscribe(result=>
      {
    
        
        this.birthdayToday=result['Todaybdays'];
       this.bdaycount=this.birthdayToday.length
       this.testmonialShow=result['message'][0]['testmonial']
       
      //  console.log(this.testmonialShow);
       this.gotdata=true
        this.loading=false
      })
    
  //  console.log(this.birthdayToday),result['bdays'];
  }

  writetestmonial(){
      this.testmonialShow=true
      this.isEdit=true
  }
  deletetestmonial(){
this.loading=true
    var deletedata={
        'userId':this.userdata['_id']
    }
    this.service.deleteTestmonial(deletedata).subscribe(data=>{
      // console.log(data);
      this.testmonialShow=false
      this.isGiven=false
      this.loading=false
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
    this.loading=true
    this.isEdit=false

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
      this.loading=false
      this.isGiven=true
      
    })
  }
  viewEvent(event)
  {
    // console.log(event);
    this.router.navigate(['/RegisterEvent',event.id])
    
  }
  getQr()
  {
    this.loading=true
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

   this.loading=false
  }

}
