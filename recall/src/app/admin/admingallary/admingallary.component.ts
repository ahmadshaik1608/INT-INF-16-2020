import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { MyserviceService } from 'app/myservice.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-admingallary',
  templateUrl: './admingallary.component.html',
  styleUrls: ['./admingallary.component.css']
})
export class AdmingallaryComponent implements OnInit {

  node=[1,2,3]
  openfolder=false
  images;
  dataval;
  file
  selected=""
  folders
  private foldersub:Subscription
  private imagesub:Subscription
  constructor(private serve:MyserviceService) { 
    this.serve.getfolder()
    this.foldersub=this.serve.getfolderupdated().subscribe(data=>{
      this.folders=data
    })
  }

  ngOnInit(): void {
  }
  createfolder(form:NgForm){
    console.log(form.value.folder)
   this.serve.addfolder(form.value.folder)
  }

  deletefolder(){
    this.serve.deletefolder(this.selected)
    this.selected=""
  }

  dispalyimages(foldrname){
    this.selected=foldrname._id
  this.serve.displayimages(this.selected)
  this.imagesub=this.serve.getimagesupdated().subscribe(data=>{
    //console.log(data,"data")
    this.images=data
    //console.log(this.images)
  })

 }

onfileselect(event){
    if(event.target.files.length>0){
       var file=event.target.files;
       console.log(file);
       console.log(this.selected);
       
      for(let img of file)
      {
        this.serve.addimages(img,this.selected)}
     }
}

  deleteimage(imgpath){
    this.serve.deleteimage(this.selected,imgpath)
  }

ngOnDestroy(){
  this.foldersub.unsubscribe()
  this.imagesub.unsubscribe()
}

}
