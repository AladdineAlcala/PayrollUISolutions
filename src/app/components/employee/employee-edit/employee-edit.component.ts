import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { Position } from 'src/app/models/position';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  //employee$!:Observable<Employee>;
  positions$!: Observable<Position[]>;
  employeeSubscription!: Subscription;
  selectedpositionval: any;

  constructor(
    private empservice: EmployeeService,
    private positionservice: PositionService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }

  private errorSubject = new BehaviorSubject<string>('');

  errorMessageAction$ = this.errorSubject.asObservable();

  id: string = '';

  employeeEditModel: any = {
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
    
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.employeeSubscription = this.empservice
      .getEmployee(this.id)
      .subscribe((data) => (this.employeeEditModel = data));

    this.positions$ = this.positionservice.position$.pipe(
      catchError((error) => {
        this.errorSubject.next(error);
        return EMPTY;
      })
    );
  }

  onDelete() {
    console.log(this.id);
  }

  onUpdate(empForm: NgForm) {
    console.log(empForm.value);
  }

  onDropDownPositionChange(e: any) {
    // console.log(e);
    this.selectedpositionval = e;
  }
}
