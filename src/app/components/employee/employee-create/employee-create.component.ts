import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { Position } from 'src/app/models/position';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateComponent implements OnInit, OnDestroy {
  new_created_employee$!: Observable<Employee>;
  positions$!: Observable<Position[]>;

  selectedpositionval!: number;
  private errorSubject = new BehaviorSubject<string>('');

  errorMessageAction$ = this.errorSubject.asObservable();

  employee: any;
  employeeSubscription!: Subscription;
  constructor(
    private empservice: EmployeeService,
    private positionservice: PositionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  employeeModel: any = {
    emp_ID: '',
    lname: '',
    middle: '',
    fname: '',
    gender: '',
    dob: new Date(),
    address: '',
    contactNo: '',
    emailAdd: '',
    date_Hired: new Date(),
    baseRate: 0,
    baseHour: 0,
    allowance: 0,
    empStatus: '',
    socialsecNum: '',
    pagibigNum: '',
    tin: '',
    is_active: false,
    maritalstatus: '',
    salarypaytype: '',
    bankpayrollaccn: '',
    bankaccNo: '',
    pos_Id: '',
    position: Position,
  };

  ngOnInit(): void {

    this.positions$ = this.positionservice.position$.pipe(
      catchError((error) => {
        this.errorSubject.next(error);
        return EMPTY;
      })
    );

      this.empservice.getEmployees$.subscribe(result=>{
        // console.log(result.length);
        const totalcount=result.length;
         this.empservice.empCountSubj.next(totalcount);
       });

  }

  register(empForm: NgForm): void {
    // console.log(this.employeeModel);

    if (empForm.valid) {
      this.new_created_employee$ = this.empservice.addEmployee(empForm.value);
      //empForm.reset();

      this.employeeSubscription = this.new_created_employee$.subscribe({
        next: (value: Employee) => (this.employee = value),
        error: (e) => console.error(e),
        complete: () => {
          if (this.employee) {
            // console.log(this.employee);
            this.router.navigate(['../',this.employee.emp_ID,'details'], {relativeTo: this.route,
            });
          }
        },
      });
    } else {
      console.log('required fields needed encounter');
    }
  }

  onDropDownPositionChange(e: any) {
    // console.log(e);
    this.selectedpositionval = e;
  }

  ngOnDestroy(): void {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
}
