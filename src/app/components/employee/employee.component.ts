import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
} from 'rxjs';
import { Employee } from 'src/app/models/employee';
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

    this.employee$.subscribe((result) => {
      // console.log(result.length);
      const totalcount = result.length;
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

  /*     Selected Event */
  OnselectedEmp(emp: Employee): void {
    this.router.navigate(['',{outlets:{main:['employees', emp.emp_ID]}}], {relativeTo: this.activatedRoute});
  }
}
