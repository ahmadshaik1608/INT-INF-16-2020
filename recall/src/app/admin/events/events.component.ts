import { Component, OnInit,ViewChild ,ViewChildren} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Subject } from 'rx-subject';
// declare var $: any;

import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { eventNames } from 'cluster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from 'app/myservice.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  loading=true
showAll=true
showOngoing
eventcreated=false
errormsg=false
eventForm: FormGroup;
table:any
file=null
formData = new FormData();
Eventstext="All Events"
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

public myVar : string = "blue";
  constructor(private formBuilder: FormBuilder,private serve:MyserviceService) {
  

    this.eventForm = this.formBuilder.group({
      'eventname':['', Validators.required],
      'organisedby':['', Validators.required],
      'startdate':['', Validators.required],
      'enddate':['', Validators.required],
      'starttime':['', Validators.required],
      'endtime':['', Validators.required],
      'venue':['', Validators.required],
      'subtext':[''],'para1':[''],'para2':[''],
      'para3':[''],'para4':[''],

    })


       
   }
get(){
  console.log("dsjs");
  
}
  title = 'angulardatatables';
  dtOptions: any = {};
 
  enablecreate

  ngOnInit() {


    this.today.setDate(this.today.getDate());
    this.today.setHours(5,30,0,0)
   this.serve.getevents().subscribe(data=>{
     this.allEvents=data
     console.log(this.allEvents);
     
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


var  self = this
let now = moment();
    $.when( $.ready ).then(function() {
    
      var events=self.dummy()

      
      for (var i=0; i<events.length; i++){
        events[i]['index'] =i+1 ;
    }
       this.table= $('#events').DataTable( {
        data:events,
    columnDefs:[
      {
         width: "1px", targets:0,data:'index'
      },
      { width: "25%",targets:1
        ,data:'eventname'},
        { width: "15%",targets:2
          ,data:'startdate', render:function(data){
            return moment(data).format('DD/MM/YYYY');
          }},
          { width: "15%",targets:3
            ,data:'starttime'},
            { width: "25%",targets:4
              ,data:'venue'},
              { width: "10%",targets:5
                ,data:'_id',render:function(data){
               
                  var date=new Date(parseInt(data.substring(0, 8), 16) * 1000);
                  return moment(date).format('DD/MM/YYYY');
                  
                }},
    ],
         pagingType: 'full_numbers',
         pageLength: 10,
         lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
         dom: 'Blfrtip',
         buttons: [
             'copy', 'csv', 'excel', 'pdf', 'print'
         ]
     } );
       });

     
   
   
  $('#text').click(()=>{
    this.get()
  })

   $('#ongoing').click(()=>{
     this.Eventstext='Ongoing Events'
      var events=this.ongoingevents
      for (var i=0; i<events.length; i++){
        events[i]['index'] =i+1 ;
    }
  $('#events').DataTable().destroy()
  var t= $('#events').DataTable( { 
    data:events,
    columnDefs:[
      {
         width: "1px", targets:0,data:'index'
      },
      { width: "25%",targets:1
        ,data:'name'},
        { width: "15%",targets:2
          ,data:'date'},
          { width: "15%",targets:3
            ,data:'time'},
            { width: "25%",targets:4
              ,data:'venue'},
              { width: "10%",targets:5
                ,data:'added'},
    ],
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
    dom: 'Blfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    order: [[ 1, 'asc' ]]
  } );

    })



    $('#upcoming').click(()=>{
      this.Eventstext='Upcoming Events'
      var events=this.upcomingevents
      for (var i=0; i<events.length; i++){
        events[i]['index'] =i+1 ;
    }
  $('#events').DataTable().destroy()
  var t= $('#events').DataTable( { 
    data:events,
    columnDefs:[
      {
         width: "1px", targets:0,data:'index'
      },
      { width: "25%",targets:1
        ,data:'name'},
        { width: "15%",targets:2
          ,data:'date'},
          { width: "15%",targets:3
            ,data:'time'},
            { width: "25%",targets:4
              ,data:'venue'},
              { width: "10%",targets:5
                ,data:'added'},
    ],
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
    dom: 'Blfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    order: [[ 1, 'asc' ]]
  } );

    })


    $('#completed').click(()=>{

      this.Eventstext="Completed Events"
      var events=this.pastevents
      for (var i=0; i<events.length; i++){
        events[i]['index'] =i+1 ;
    }
  $('#events').DataTable().destroy()
  var t= $('#events').DataTable( { 
    data:events,
    columnDefs:[
      {
         width: "1px", targets:0,data:'index'
      },
      { width: "25%",targets:1
        ,data:'eventname'},
        { width: "15%",targets:2
          ,data:'startdate', render:function(data){
            return moment(data).format('DD/MM/YYYY');
          }},
          { width: "15%",targets:3
            ,data:'starttime'},
            { width: "25%",targets:4
              ,data:'venue'},
              { width: "10%",targets:5
                ,data:'_id',render:function(data){
               
                  var date=new Date(parseInt(data.substring(0, 8), 16) * 1000);
                  return moment(date).format('DD/MM/YYYY');
                  
                }},
    ],
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
    dom: 'Blfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    order: [[ 1, 'asc' ]]
  } );

    })

   
}
getEvents(){}

generateevent(data){
  this.errormsg=false
  if(data.valid && this.file!=null)
 { 
   this.eventcreated=false  
   var H = +data.value.starttime.substr(0, 2);
   var h = H % 12 || 12;
   var ampm = (H < 12 || H === 24) ? "AM" : "PM";
   data.value.starttime= h + data.value.starttime.substr(2, 3) +' '+ampm;

   var H = +data.value.endtime.substr(0, 2);
   var h = H % 12 || 12;
   var ampm = (H < 12 || H === 24) ? "AM" : "PM";
   data.value.endtime= h + data.value.endtime.substr(2, 3) +' '+ampm;

  for ( const key of Object.keys(data.value) ) {
    const value =data.value[key];  
   
    this.formData.append(key, value);
  }
  // this.formData.append
   this.serve.createevent(this.formData).subscribe((data)=>{
      if(data['status']=='ok'){
        this.eventcreated=true
      }
   })
    }
    else{
      this.errormsg=true
      
    }

}
onFileChange(event) {
  if ( event.target.files.length>0) {
   this.file = event.target.files[0];
    this.formData.append('file',this.file);
  }
  console.log("fgdhf");
}

create()
{
  
  this.enablecreate=!this.enablecreate
  
}
dummy(){

  return this.allEvents
}


}
