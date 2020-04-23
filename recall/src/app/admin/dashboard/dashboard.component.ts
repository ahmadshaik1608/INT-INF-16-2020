import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
searchString
p:number=1;
  allalumni=[
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
    {'name':'Ahmad','batch':2020,'email':'ahmad@mail.com','branch':'Computer science and engineering','institute':'sree vidyanikethan engineering college'    },
  ]
  displayedColumns: string[] = [ 'rowIndex','name', 'batch', 'email','branch','institute'];
  dataSource=new MatTableDataSource(this.allalumni);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


// /** Builds and returns a new User. */


}
// function createNewUser(id: number): UserData {
//   const name = allalumni[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };

