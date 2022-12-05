import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, Data, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
} from 'rxjs';
import { Employee } from 'src/app/models/employee';
=======
import { ActivatedRoute, Data } from '@angular/router';
import { BehaviorSubject, catchError, count, EMPTY, map, Observable, of } from 'rxjs';


import { Employee, EmployeeResolved } from 'src/app/models/employee';
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmployeeComponent implements OnInit {

  title: string = 'Employee List';

  employee$!: Observable<any>;

  errorMessage: string = '';

  empCount: number = 0;
  resposeDTO!: ResponseDTO;

  private errorSubject = new BehaviorSubject<string>('');

  errorMessageAction$ = this.errorSubject.asObservable();

  constructor(
    private empService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    /*     //data comes from resolver
=======
    
/*     //data comes from resolver
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
    const resolveData:EmployeeResolved=this.activatedRoute.snapshot.data['empres'];
    this.errorMessage=resolveData.error;
    this.errorSubject.next(this.errorMessage);
    this.employee$=resolveData.employee; */

<<<<<<< HEAD
    this.employee$ = this.activatedRoute.data.pipe(
=======
  //---------------------------------------------------------------
 this.employee$ = this.activatedRoute.data.pipe(
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
      map((data: Data) => data?.['empres']),
      catchError((error) => {
        // console.log(error)
        this.errorSubject.next(error);
        return EMPTY;
      })
<<<<<<< HEAD
    );

    this.employee$.subscribe((result) => {
      // console.log(result.length);
      const totalcount = result.length;
      this.empService.empCountSubj.next(totalcount);
    });
=======
    ); 
  
/*      this.employee$.subscribe(result=>{
     // console.log(result.length);
     const totalcount=result.length;
      this.empService.empCountSubj.next(totalcount);
    }); */
 
    
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8

    /*  this.employee$= this.empservice.getEmployees$
            .pipe(catchError((error)=>{
              this.errorSubject.next(error)
                    return EMPTY;
              }
            )
          ); */

  
  }

<<<<<<< HEAD
  /*     Selected Event */
  OnselectedEmp(emp: Employee): void {
    this.router.navigate(['',{outlets:{main:['employees', emp.emp_ID]}}], {relativeTo: this.activatedRoute});
  }
=======
  //Delete Employee
  /*   selectedEmptoDelete(selected:Employee):void{
    console.log(selected);
 } */



>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
}
