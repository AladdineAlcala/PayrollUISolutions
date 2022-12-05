import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-wage',
  templateUrl: './wage.component.html',
  styleUrls: ['./wage.component.css']
})
export class WageComponent implements OnInit,OnDestroy {

  empwageSubscription:Subscription=new Subscription()
  @Input() employee_wage$!: Observable<Employee>;

  employee:Employee={} as Employee;

  ngOnInit(): void {
   this.employee_wage$.subscribe((res:Employee)=> {

      this.employee=res;
   });
  }


  ngOnDestroy(): void {
   if(this.empwageSubscription){
    this.empwageSubscription.unsubscribe();
   }
  }

}
