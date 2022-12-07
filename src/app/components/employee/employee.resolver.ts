import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { catchError, delay, EMPTY, Observable, of, throwError } from 'rxjs';

import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { GetdeductionResolver } from '../deductions/getdeduction.resolver';
import { GetemployeeResolver } from './getemployee.resolver';

@Injectable({
  providedIn: 'root',
})
export class EmployeeResolver implements Resolve<{empresolver:any,deductionresolver:any}> {

  constructor(
      protected employee:GetemployeeResolver,
      protected deduction:GetdeductionResolver
    ) 
    {}

      

  async resolve(route:any):Promise<any> {

      const emp=await this.employee.resolve(route);

    return {employee,deduction }
    

  
}
