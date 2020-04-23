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
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
showAll=true
showOngoing
table:any

  constructor() {
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
       this.table= $('#events').DataTable( {
         data:events,
         columns:[
           {data:'name'},
           {data:'name'},
           {data:'name'},
           {data:'name'},
           {data:'name'},
           {data:'name'},
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
       console.log(this.table);
       
   }

  title = 'angulardatatables';
  dtOptions: any = {};
 
  enablecreate

  ngOnInit() {
   

   $('#ongoing').click(function(){
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


    $('#upcoming').click(function(){
      function get()
      {
        console.log('fkvdj');
        
      }
    
      var events=[
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
     
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allujbvsfvbjsvbjsbvjsdjgsdkjjsgkjgjyfr','added':'10-20-10'  },
        {  'name':'event-1','date':'10-20-10','time':'10:20','venue':'allur','added':'10-20-10'  },
      ]
  $('#events').DataTable().destroy()
  var t= $('#events').DataTable( { 
    data:events,
    columnDefs:[
      {
         width: "1px", targets:0,data:null,
         defaultContent:"0"
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

    t.on( 'order.dt search.dt', function () {
      t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
          cell.innerHTML = i+1;
      } );
  } ).draw();

    })

   
}
getEvents()
{

}
create()
{
  console.log("jfvgsdfgsd");
  this.enablecreate=true
  
}
get()
{
  console.log("dfbhsdfjsgj")
}
upcoming()
{
this.showAll=false
this.showOngoing=true

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
  ]
  
}



present()
{
 
               
}
completed()
{
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
  ]
}


}
