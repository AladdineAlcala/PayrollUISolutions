import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

employee:Employee={} as Employee;
employeeSource:BehaviorSubject<Employee>;


  constructor() 
  {
    this.employeeSource=new BehaviorSubject(this.employee);
  }

  getCurEmployees(){
    this.employeeSource.next(this.employee);
  }
}
