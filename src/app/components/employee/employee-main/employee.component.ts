import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  map,
  Observable,
} from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import { EmployeeListComponent } from 'src/app/components/employee/employee-list/employee-list.component'


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmployeeComponent implements OnInit {


  title: string = 'Employee Main File';

  employee$!: Observable<any>;


  errorMessage: string = '';

  empCount: number = 0;
  resposeDTO!: ResponseDTO;

  private errorSubject = new BehaviorSubject<string>('');

  errorMessageAction$ = this.errorSubject.asObservable();

  _searchval!:string


   @ViewChild(EmployeeListComponent)
   emplist!:EmployeeListComponent 
 
   onClose(){
    //console.log('closer');
    this.router.navigate(['',{ outlets: {side:'employees',main:null} }]);

  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingspinner: NgxSpinnerService,
    private router:Router
  ) {}

  ngOnInit(): void {
   // this.loadingspinner.show();
    //comes from employee resolver
   this.employee$ = this.activatedRoute.data.pipe(
    delay(2000),
      map((data: Data) => data?.['employeeresolver']),
      catchError((error) => {
        // console.log(error)
        this.errorSubject.next(error);
        return EMPTY;
      })
    ); 
     
   

  




/*     this.employee$.subscribe((result) => {
      // console.log(result.length);
      const totalcount = result.length;
      this.empService.empCountSubj.next(totalcount);
    }); */

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
    
    this.router.navigate(['',{outlets:{main:['employees', emp.emp_Id,'profile']}}], {relativeTo: this.activatedRoute});
  }
}
