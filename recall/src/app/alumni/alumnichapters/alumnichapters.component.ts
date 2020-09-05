import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MyserviceService } from 'app/myservice.service';
import { data } from 'jquery';


@Component({
  selector: 'app-alumnichapters',
  templateUrl: './alumnichapters.component.html',
  styleUrls: ['./alumnichapters.component.css']
})
export class AlumnichaptersComponent implements OnInit {
loading=true
chapters
loggedIn
  constructor( private router:Router,
                private route: ActivatedRoute,private serve:MyserviceService) { 
      
                  serve.getchapters().subscribe(data=>{
                           this.chapters=data['chapters']
                           //console.log(this.chapters);
                           this.loading=false
                  })

          }

  ngOnInit(): void {
  }
 
  visit(event)
  {
    this.loggedIn=localStorage.getItem('isLoggedIn')
    if(this.loggedIn=='true')
             this.router.navigate(['Alumni/Chapter'],{state:{ event}})
     else
             {
               this.loggedIn='false'
               this.fadeOutMessage()
             }
  }

  fadeOutMessage()
  {
    setTimeout(()=>{
      this.loggedIn=''
    },3000)
  }
 
}
