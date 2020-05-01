import { Component, OnInit,ViewChild ,ViewChildren} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
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
    $.when( $.ready ).then(function() {
   
      var events=[
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },{  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },{  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
      
      ]
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
         ]
     } );
       });

       
   }
get(){
  console.log("dsjs");
  
}
  title = 'angulardatatables';
  dtOptions: any = {};
 
  enablecreate

  ngOnInit() {

   
  $('#text').click(()=>{
    this.get()
  })

   $('#ongoing').click(()=>{
     this.Eventstext='Ongoing Events'
      var events=[
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
      ]
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
      var events=[
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
      ]
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
      var events=[
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
      ]
      for (var i=0; i<events.length; i++){
        events[i]['index'] =i+1 ;
    }
  $('#events').DataTable().destroy()
  var t= $('#events').DataTable( { 
    data:events,
    columnDefs:[
      {
         width: "1px", targets:0,data:'index',
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

   
}
getEvents(){}

generateevent(data){
  this.errormsg=false
  if(data.valid && this.file!=null)
 { 
   this.eventcreated=false  
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



}
