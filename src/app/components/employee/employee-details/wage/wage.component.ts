import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { DataService } from '../../employee-data.service';

@Component({
  selector: 'app-wage',
  templateUrl: './wage.component.html',
  styleUrls: ['./wage.component.css']
})
export class WageComponent implements OnInit,OnDestroy {

  empwageSubscription:Subscription=new Subscription()
  employee_wages$!: Observable<Employee>;

  constructor(private empDataService:DataService) {}

  employee:Employee={} as Employee;

  ngOnInit(): void {
   this.employee_wages$=this.empDataService.employeeSource.asObservable();
   this.empwageSubscription=this.employee_wages$.subscribe((res:Employee)=> {

      this.employee=res;
   });
  }


  ngOnDestroy(): void {
   if(this.empwageSubscription){
    this.empwageSubscription.unsubscribe();
   }
  }

}
