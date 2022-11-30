import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  empCount:number=0;

  constructor(private empService:EmployeeService ) { }

  ngOnInit(): void {
    
    this.empService.empCountSubj.subscribe(cnt=>{
      this.empCount=cnt
    });
  }
  

  title = 'payrollUI';
  
}
