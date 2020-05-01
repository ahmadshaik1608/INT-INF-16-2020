import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MyserviceService} from '../../myservice.service';
import * as $ from 'jquery';

export interface UserData {
  id:string
  name: string;
  batch: number;
  email: string;
  branch:string;
  institute:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading=true
searchString
showusers
p:number=1;
userprofile=false
showTable=false
userprofiledata
searchkey
userstype='New Users'
subtext='Registered 10 days Ago'
approvedusers=[]
unapprovedusers=[]
newusers=[]
events=[1,2,3]
user=[1,2,3,1,1,1,1,1,1,1]
 allAlumni
  displayedColumns: string[] = [ 'rowIndex','name', 'batch', 'email','branch','institute'];


  constructor( private serve:MyserviceService) {
    
    var d = new Date();
 d.setDate(d.getDate()-10);
 d.setHours(0,0,0,0)
 console.log(d);
 

      serve.getUsers('Alumni').subscribe((data)=>{
       this.allAlumni=data    
     console.log(this.allAlumni);
     
     for(var i of this.allAlumni)
     {

       if(i['approved']){
         this.approvedusers.push(i)
       }
       else{
         this.unapprovedusers.push(i)

       }
       
       if(new Date(i['registeredon'])>d){
          this.newusers.push(i)
       }
      

     }
    
       this.showusers=this.newusers
       this.loading=false  
     
  })
}
  

  ngOnInit() {
      $('#tableshow').click(()=>{
        console.log(this.allAlumni);
        $('#events').DataTable().destroy()
        
        $('#events').DataTable( {


       
          data:this.allAlumni,
      columnDefs:[
        {
           width: "1%", targets:0,data:'index'
        },
        { width: "10%",targets:1
        ,data:'Name'},
        { width: "10%",targets:2
          ,data:'email'},
          { width: "15%",targets:4
            ,data:'institution'},
            { width: "5%",targets:5
              ,data:'yop'},
              { width: "10%",targets:6
                ,data:'branch'},
                { width: "5%",targets:3
                ,data:'approved',
               
                createdCell: function(td, cellData, rowData, row, col) {
                  if ( cellData == false ) {
                    $(td).css('color', 'red')
                  }
                }
              //     console.log(cellData);
                  
              //     switch(cellData) {
              //     case true:
              //         $(td).addClass('greenClass');
              //         break;
              //     case false:
              //         $(td).addClass('redClass');
              //         break;
            
              //     }
              // }
            },
      ],
      order: [[ 1, 'asc' ]],
           pagingType: 'full_numbers',
           pageLength: 10,
           autoWidth:false,
           lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
           dom: 'Blfrtip',
           buttons: [
            {
              extend: 'copyHtml5',
              exportOptions: {
                  columns: [ 0, ':visible' ]
              }
          },
          {
              extend: 'excelHtml5',
              exportOptions: {
                  columns: ':visible'
              }
          },
          {
              extend: 'pdfHtml5',
              exportOptions: {
                  columns: [ 0, 1, 2, 5 ]
              }
          },
        ]
       } );
      })
  }

showUser(data)
{
  console.log(data);
  this.userprofiledata=data
  
}
newUsers()
{
  this.userstype='New Users'
  this.subtext='Registered 10 days Ago'
  this.showTable=false
  this.showusers=this.newusers
}
approvedUsers()
{
  this.userstype='Approved Users'
  this.subtext='Users Approved by Admin'
  this.showTable=false
  this.showusers=this.approvedusers
}
unapprovedUsers()
{
  this.userstype='UnApproved Users'
  this.subtext='Users waiting for Admins Approval'
  this.showTable=false
  this.showusers=this.unapprovedusers
}
totalUsers()
{
  this.loading=true
  this.userstype='All Users'
  this.subtext='Registered Users'
  this.showTable=true

  for(var i =0;i<this.allAlumni.length;i++)
  {
    this.allAlumni[i]['index']=i+1
  }
  $('#events').DataTable( {

   
      data:this.allAlumni,
  columnDefs:[
    {
       width: "1%", targets:0,data:'index'
    },
    { width: "10%",targets:1
      ,data:'Name'},
      { width: "15%",targets:2
        ,data:'email'},
        { width: "15%",targets:4
          ,data:'institution'},
          { width: "5%",targets:5
            ,data:'yop'},
            { width: "10%",targets:6
              ,data:'branch'},
              { width: "5%",targets:3
              ,data:'approved',
              
              createdCell: function(td, cellData, rowData, row, col) {
                if ( cellData ==false ) {
                  $(td).addClass('redClass').text('Not Approved')
                  $(td).css('color','red')
                }
                else{
                  $(td).addClass('redClass').text('Approved')
                  $(td).css('color','green')
                }
              }
           },
  ],
  order: [[ 1, 'asc' ]],
       pagingType: 'full_numbers',
       pageLength: 10,
       autoWidth:false,
       ordering: false,
processing: true,
retrieve: true ,
       lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
       dom: 'Blfrtip',
       buttons: [
        {
          extend: 'copyHtml5',
          exportOptions: {
              columns:[0,1,2,4,5,6] 
          }
      },
      {
          extend: 'excelHtml5',
          exportOptions: {
              columns: [0,1,2,4,5,6] 
          }
      },
      {
        extend: 'csvHtml5',
        exportOptions: {
            columns:[0,1,2,4,5,6] 
        }
    },
      {
          extend: 'pdfHtml5',
          exportOptions: {
              columns:[0,1,2,4,5,6] 
          }
      },
      {
        extend: 'print',
        exportOptions: {
            columns:[0,1,2,4,5,6] 
        }
    },
    ],
   
   } );
   this.loading=false
}
approval(){
  this.loading=true
  var data={
    'id':this.userprofiledata['_id'],
   'approved':true
  }
  this.serve.approvalbyadmin(data).subscribe(userdata=>{

  
//   this.serve.approveuser(data).subscribe((data)=>{
    this.allAlumni=userdata    
     this.approvedusers=[]
     this.unapprovedusers=[]
    for(var i of this.allAlumni)
    {

      if(i['approved']){
        this.approvedusers.push(i)
      }
      else{
        this.unapprovedusers.push(i)
        console.log(i);
        
      }
    }
      this.showusers=this.unapprovedusers
        this.loading=false
    
 })
  
}

}

