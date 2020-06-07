import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-givingtous',
  templateUrl: './givingtous.component.html',
  styleUrls: ['./givingtous.component.css']
})

export class GivingtousComponent implements OnInit {
  ongoingevents=[  ]
  upcomingevents=[]
 pastevents=[ ]
 event
 islogin
registered=false
  min
  max
  eventregister=false
  today = new Date();
  allEvents
  colors=['#E0C568FF','#97BC62FF','#ADEFD1FF','#D4B996FF','lightgrey','#C7D3D4FF','#F2EDD7FF']
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private service:MyserviceService
  ) {
    
    this.today.setDate(this.today.getDate());
     this.today.setHours(5,30,0,0)
    service.getevents().subscribe(data=>{
      this.allEvents=data
      
      for(let event of this.allEvents){     
        if(new Date(event['enddate'])>this.today && new Date(event['startdate'])<=this.today){
          this.ongoingevents.push(event)
        }
        else if(new Date(event['startdate'])>this.today){
          this.upcomingevents.push(event)
        }
        else if(new Date(event['enddate'])<this.today){
          this.pastevents.push(event)
        }
      }
      var min=0
      var max=7
      for(var i=0;i<this.ongoingevents.length;i++){
          this.ongoingevents[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
      }    
      for(var i=0;i<this.upcomingevents.length;i++){
        this.upcomingevents[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
          }
    for(var i=0;i<this.pastevents.length;i++){
      this.pastevents[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];    
  }
      
     })
      
    
  }


  ngOnInit() {
  }

  viewEvent(event)
  {
    // console.log(event);
    this.registered=false
    this.islogin=null
    this.event=event
    if(localStorage.getItem('isLoggedIn')=='true'){
    for(let member of this.event.registeredmembers){
     if(localStorage.getItem('token')==member){
       this.registered=true
       break
     }
    }
   
    this.islogin=null
  }    
  this.eventregister=true
  }
  registerEvent()
  {
   
    if(localStorage.getItem('isLoggedIn')=='false'){
        this.islogin=false
        console.log("fnjdng");
        
    }
    else{
      this.service.registerEvent(localStorage.getItem('token'),this.event._id).subscribe(data=>{
         if(data['status']=='succes')
         {
           this.registered=true
         }
          
      })
      
     
      this.islogin=true
    }
  }
}

