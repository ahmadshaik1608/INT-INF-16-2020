import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
about=[]
indivabout
show=false
  constructor(private serve:MyserviceService) { 
    serve.getabutus().subscribe(data=>{
        this.about=data['messages']
        
    })
  }

  ngOnInit() {
  }
  openmodel(eachabout)
  {
    this.show=true
    this.indivabout=eachabout
  }

}
