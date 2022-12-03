import { Injectable } from '@angular/core';
import {
  Router,
  Resolve
} from '@angular/router';
import { catchError, delay, EMPTY, Observable, of, throwError } from 'rxjs';


import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeResolver implements Resolve<Employee[]> {
  constructor(private empservice: EmployeeService, private router: Router) {}

  private handleError(){
     return of(null)
  }

  resolve(): Observable<Employee[]> | Promise<Employee[]> | Employee[] {
    return this.empservice.getEmployees$.pipe(
     // delay(2000),
      catchError((error)=>{
        this.router.navigate(['/error']);
       // console.info('error has encountered by employee resolver');
        return throwError(()=> new Error('Could not load data........'))

       

      })
    );
  }
}
