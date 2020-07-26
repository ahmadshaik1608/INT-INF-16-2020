import { Component, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject } from "rxjs";
import { MyserviceService } from 'app/myservice.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admingallary',
  templateUrl: './admingallary.component.html',
  styleUrls: ['./admingallary.component.css']
})
export class AdmingallaryComponent implements OnInit {
  loading=true
  node=[1,2,3]
  openfolder=false
  images;
  dataval;
  file
  selected=""
  folders

  private foldersub:Subscription
  private imagesub:Subscription
  constructor(private serve:MyserviceService,private toastr: ToastrService) { 
    this.serve.getfolder()
    this.foldersub=this.serve.getfolderupdated().subscribe(data=>{
      this.folders=data
      console.log(this.folders);
      
    })
    this.loading=false
  }

  ngOnInit(): void {
  }
  createfolder(form:NgForm){
   
    console.log(form.value.folder)
    if(form.value.folder=='')
    {
              this.showError("Provide a name for folder")
    }
    else{
      this.loading=true
   this.serve.addfolder(form.value.folder)
   this.loading=false
    }
  }

  deletefolder(i){
    this.serve.deletefolder(i['_id'])
    this.selected=""
  }

  dispalyimages(foldrname){
    this.loading=true
    this.selected=foldrname._id
  this.serve.displayimages(this.selected)
  this.imagesub=this.serve.getimagesupdated().subscribe(data=>{
    //console.log(data,"data")
    this.images=data
    //console.log(this.images)
    this.loading=false
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
  thumbnail(imagepath){
    this.serve.thumbnail(this.selected,imagepath)
    this.showSuccess("Thumbnail Changed Succesfully")
  }

ngOnDestroy(){
  this.foldersub.unsubscribe()
  this.imagesub.unsubscribe()
}
showSuccess(message){
  this.toastr.success(message,'',{ closeButton:true})
}
showError(message){
  this.toastr.error(message,'',{ closeButton:true})
}
}
