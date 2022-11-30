import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Type,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { BehaviorSubject, catchError, count, EMPTY, map, Observable, of } from 'rxjs';
import { Employee, EmployeeResolved } from 'src/app/models/employee';
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
  
  empCount:number=0;
  resposeDTO!: ResponseDTO;
 
  private errorSubject = new BehaviorSubject<string>('');

  errorMessageAction$ = this.errorSubject.asObservable();

  constructor(private empService:EmployeeService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
/*     //data comes from resolver
    const resolveData:EmployeeResolved=this.activatedRoute.snapshot.data['empres'];
    this.errorMessage=resolveData.error;
    this.errorSubject.next(this.errorMessage);
    this.employee$=resolveData.employee; */

 this.employee$ = this.activatedRoute.data.pipe(
      map((data: Data) => data?.['empres']),
      catchError((error) => {
       // console.log(error)
        this.errorSubject.next(error);
        return EMPTY;
      })
    ); 
  
     this.employee$.subscribe(result=>{
     // console.log(result.length);
     const totalcount=result.length;
      this.empService.empCountSubj.next(totalcount);
    });
 
    

    /*  this.employee$= this.empservice.getEmployees$
            .pipe(catchError((error)=>{
              this.errorSubject.next(error)
                    return EMPTY;
              }
            )
          ); */
  }

  //Delete Employee
  /*   selectedEmptoDelete(selected:Employee):void{
    console.log(selected);
 } */
}
