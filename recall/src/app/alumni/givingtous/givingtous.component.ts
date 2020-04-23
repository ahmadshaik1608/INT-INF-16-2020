import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-givingtous',
  templateUrl: './givingtous.component.html',
  styleUrls: ['./givingtous.component.css']
})

export class GivingtousComponent implements OnInit {
  ongoingevents=[
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
   
  ]
  upcomingevents=[
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
  {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"}
  ]
 pastevents=[
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':121,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':122,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"},
    {'id':123,'name':"Event1",'date':'12-23-1918','day':"Monday",'time':"2:00Pm"}
  ]
  colors
  min
  max
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private service:MyserviceService
  ) {
    this.colors=['#E0C568FF','#97BC62FF','#ADEFD1FF','#D4B996FF','lightgrey','#C7D3D4FF','#F2EDD7FF']
     var min=0
    var max=7
    for(var i=0;i<this.ongoingevents.length;i++){
        this.ongoingevents[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
    }
    console.log(this.ongoingevents);
    
    for(var i=0;i<this.upcomingevents.length;i++){
      this.upcomingevents[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
  }
  for(var i=0;i<this.pastevents.length;i++){
    this.pastevents[i]['color']= this.colors[Math.floor(Math.random() * (max - min + 1)) + min];
}
    
   }

  ngOnInit() {
  }

  viewEvent(event)
  {
    // console.log(event);
    this.router.navigate(['/RegisterEvent',event.id])
    
  }
}

