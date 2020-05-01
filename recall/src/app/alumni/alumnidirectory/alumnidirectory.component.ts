import { Component, OnInit } from '@angular/core';
import {MyserviceService} from '../../myservice.service';
import { strict } from 'assert';

@Component({
  selector: 'app-alumnidirectory',
  templateUrl: './alumnidirectory.component.html',
  styleUrls: ['./alumnidirectory.component.css']
})
export class AlumnidirectoryComponent implements OnInit {
isloggedin
mycolor
bgcolor
realdirectory=[]
directory=[]
hell:any
opensearch
hai="ha"
opensort
selectedsort
selectedsearch
noAlumni=false
isaproved
hideme = {};
totalalumni
selectedsearchkey
public qrdata: any =[];
institutes=[
  "Sree Vidyanikethan International School(SVIS), Tirupati",
  " Sree Vidyanikethan Degree College(SVDC)",
  "Sree Vidyanikethan Engineering College(SVEC)",
  "Sree Vidyanikethan College of Nursing(SVCN)",
  "Sree Vidyanikethan College of Pharmacy(SVCP)",
  "Sree Vidyanikethan International School(SVIS), Hyderabad",
  "Sree Vidyanikethan Institute of Management(SVIM)"

];

  constructor(private serve:MyserviceService) { 
    this.isloggedin=this.serve.isLoggedIn
    
  }
  userdata
  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')=='true')
    {
      this.isloggedin=true
    }
      this.serve.getUsers("Alumni").subscribe((data)=>{
       this.realdirectory=data
       this.directory=this.realdirectory
       this.hell=this.serve.bgcolors
  
      })
      this.serve.datauaser.subscribe(result=>{
        this.userdata=result['message'][0]
    
        
        if(this.userdata['approved'])
        {
          this.isaproved=true
        }
        else{
          this.isaproved=false
        }
      })
      this.hideme = {};
  }
eachone()
{
  
 var min=0;
  var max=2;
  var arr=['#DC143C','black','#003152']
  this.mycolor=arr[Math.floor(Math.random()*(max-min+1)+min)]
  // hell["color"]=this.mycolor
  // console.log(hell.color);
  
  this.directory[0]['color']=this.mycolor
  console.log(this.mycolor)

}
getColors(index) {

  return this.mycolor;
}
issearch=false
onChangesearchtype(event)
{
    this.issearch=true
    this.noAlumni=false
    this.selectedsearch=event.target.value
    if(this.selectedsearch=='yop'){
      this.selectedsearchkey="Batch"
    }
    else if(this.selectedsearch=='rollno')
    {
      this.selectedsearchkey="Roll No"
    }
    else{
      this.selectedsearchkey=this.selectedsearch
    }

    if(this.selectedsearch=="None")
    {
      this.noAlumni=false
      this.directory=this.realdirectory
      this.totalalumni=this.realdirectory.length
      console.log(this.directory);
      
    }
}
onChangesorttype(event)
{
    this.issearch=true
    this.selectedsort=event.target.value
   
}

sortdata(){
  this.noAlumni=false
  this.directory=this.realdirectory
  console.log(this.selectedsort);
  console.log(this.directory);
  var sorted=this.selectedsort
  // console.log(this.hell);
  this.directory.sort(function(a, b){  
      var nameA=String(a[sorted]).toLowerCase(), nameB=String(b[sorted]).toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 
    })
  console.log((this.directory));
  
}
keysearch
searchdata(key)
{
  console.log(this.selectedsearch);
  this.noAlumni=false
  var jskey={}
  this.keysearch=key
  jskey[this.selectedsearch]=key
  console.log(jskey);
  
  this.serve.searchalumni(jskey).subscribe(data=>
    {
      if(data.length==0){
       this.noAlumni=true
        this.directory=[]
      }
      else{
        this.noAlumni=false
        this.directory=data
        
      }
      
    })
  
}
showQr(thisAlumni,index)
{
  console.log(thisAlumni);
  if(this.isaproved)
  {
    for(var i=0;i<this.totalalumni;i++)
  {
    if(i!=index)
    {
      this.hideme[i]=true
    }
  }
  // var data=''
  // var keys
  // var value
  // var Notarray=['Name','email']
  // Object.keys(thisAlumni).forEach(function(key) {
  //   keys=key
  //   value=thisAlumni[key]
  //   if(key=="yop")
  //   {
  //     keys="PassOut year"
  //   }
  //   if(key=="dateofbirth")
  //   {
  //     keys="Born On"
  //     value=value.substr(0,10)
  //   }
  //   if(key !='_id' && key!='password' && key!='__v')
  //     data=data +'\n' +(keys.charAt(0).toUpperCase() + keys.slice(1)) + ' : ' + value
  // })
// this.qrdata=""
   this.qrdata[index] = 'Name : '+thisAlumni.Name+'\n'+
                  'Roll No : '+thisAlumni.rollno+'\n'+
                 'Email : '+thisAlumni.email+'\n'+ 
                 'Born On : '+thisAlumni.dateofbirth.substr(0,10)+'\n'+
                 'Email : '+thisAlumni.email+'\n'+
                 'Passed Out Year : '+thisAlumni.yop+'\n'+
                 'Company : '+thisAlumni.company+'\n' +
                 'Designation : '+thisAlumni.designation+'\n' +
                 'Location : '+thisAlumni.location

              }  
}

}


