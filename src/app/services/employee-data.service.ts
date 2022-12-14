import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmpDeductionSettings } from 'src/app/models/employeedeductions';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  
employee:Employee={} as Employee;
employeeSource:BehaviorSubject<Employee>;

employeededuction:EmpDeductionSettings[]=[{}as EmpDeductionSettings]
employeedeductionSource:BehaviorSubject<EmpDeductionSettings[]>;

  constructor() 
  {
    this.employeeSource=new BehaviorSubject(this.employee); 
    this.employeedeductionSource=new BehaviorSubject(this.employeededuction)

  }

  getCurEmployees(){
    this.employeeSource.next(this.employee);
  }

  setDeductionEmployee():Observable<EmpDeductionSettings[]> {
   return this.employeedeductionSource.asObservable();
  }

  
}
