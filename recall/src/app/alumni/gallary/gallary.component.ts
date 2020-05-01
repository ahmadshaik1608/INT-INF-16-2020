import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyserviceService } from 'app/myservice.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {

  images;
  dataval;
 isAdmin=false
 foldersub
 folders={}
 selected
 imagesub
 showimages=false
  constructor(private http:HttpClient,
              private serve:MyserviceService) { }

  ngOnInit(): void {
    // this.http.get<any>('http://localhost:3000/getfiles').subscribe((data)=>{
    //  this.dataval=data.value
    //   console.log(this.dataval)
      
    // })
    this.serve.getfolder()
    this.foldersub=this.serve.getfolderupdated().subscribe(data=>{
      this.folders=data
      this.dataval=true
      console.log(this.folders);
      
    })
  }
  onfileselect(event){
    if(event.target.files.length>0){
      
      const file=event.target.files;
      for(let img of file)
      {
      this.images=img;
      
      const formdata=new FormData();
      formdata.append('file',this.images);

      this.http.post<any>('http://localhost:3000/file',formdata).subscribe((data)=>{
       console.log(data.status)
    });
    }
    }
    
  }
  dispalyimages(foldrname){
    this.showimages=true
    console.log(foldrname);
    
    this.selected=foldrname._id
  this.serve.displayimages(this.selected)
  this.imagesub=this.serve.getimagesupdated().subscribe(data=>{
    //console.log(data,"data")
    this.images=data
    //console.log(this.images)
  })

 }


}
