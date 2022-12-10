import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class GetemployeeResolver implements Resolve<Employee[]> {


  constructor(
    private empservice: EmployeeService, 
    private router: Router,
    private activateRoute:ActivatedRoute
  ) {}
  resolve(): Observable<Employee[]> | Promise<Employee[]> | Employee[] {
    return this.empservice.getEmployees$.pipe(
     // delay(2000),
      catchError(() => {
        this.router.navigate(['',{outlets:{main:['error']}}], {relativeTo: this.activateRoute});
       // this.router.navigate(['/error']);
        // console.info('error has encountered by employee resolver');
        return throwError(() => new Error('Could not load data........'));
      })
    );
  }
}


/* this.router.navigate(['',{outlets:{main:['employees', this.employee.emp_ID]}}], {relativeTo: this.route}); */