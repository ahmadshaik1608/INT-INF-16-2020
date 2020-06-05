import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-alumnichapters',
  templateUrl: './alumnichapters.component.html',
  styleUrls: ['./alumnichapters.component.css']
})
export class AlumnichaptersComponent implements OnInit {
loading=true
  constructor( private router:Router,
                private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }
  chapters=[
    {'name':'Chennai','image':'../../assets/images/chennai.jpg','members':15,'events':10,'formed':'15 Aug 1998'},
    {'name':'Banglore','image':'../../assets/images/bangalore.jpg','members':25,'events':7,'formed':'11 Jun 2004'},
    {'name':'Hyderabad','image':'../../assets/images/hydrabad.jpg','members':75,'events':30,'formed':'25 Jan 2000'}
  ]
  visit(event)
  {
    // console.log(event);
    this.router.navigate(['Alumni/Chapter',event.name])
    
  }
}
