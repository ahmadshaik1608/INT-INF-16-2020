import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

chaptername
  constructor( private router:Router,
    private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chaptername=params['name']
    }
    )
  }
  coordinators=[
    {'name':'Ravi kumar','yop':2020 ,'branch':'Computer Science and Engineering','designation':'Developer','company':'infosys','location':'Chennai'},
    {'name':'Prasad','yop':2019 ,'branch':'Mechanical Engineering','designation':'Tester','company':'Tata','location':'Chennai'},
    {'name':'Priya','yop':2019 ,'branch':'Computer Science and Engineering','designation':'Manager','company':'infosys','location':'Chennai'}
  ]
 members=[
  {'name':'Naveen kumar','yop':2020 ,'branch':'Computer Science and Engineering','designation':'Developer','company':'infosys','location':'Chennai'},
  {'name':'Ahmad shaik','yop':2020 ,'branch':'Mechanical Engineering','designation':'Developer','company':'Tata','location':'Chennai'},
  {'name':'Kalyan','yop':2019 ,'branch':'Computer Science and Engineering','designation':'Project Manager','company':'Infosys','location':'Chennai'},
  {'name':'Farhan Shaik','yop':2000 ,'branch':'Electrical and Electronic Engineering','designation':'Senior Developer','company':'Cognizant','location':'Chennai'},
  {'name':'Madhu','yop':2020 ,'branch':'Information Technology(IT)','designation':'Manager','company':'Techcrots','location':'Chennai'},

 ]
}
