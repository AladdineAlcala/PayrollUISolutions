import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
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
export class EmployeeCreateComponent implements OnInit {
  employee$!: Observable<Employee>;
  positions$!: Observable<Position[]>;

  selectedpositionval!:number;
  private errorSubject=new BehaviorSubject<string>('');
  
  errorMessageAction$=this.errorSubject.asObservable();

  
  constructor(
    private empservice: EmployeeService,
    private positionservice: PositionService,
    private route:Router
  ) {}

  ngOnInit(): void {

    this.positions$=this.positionservice.position$.pipe(catchError((error)=>{
              this.errorSubject.next(error)
                    return EMPTY;
              }
            )
          );

  }

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
    position:Position,
  };


  register(empForm: NgForm): void {
    console.log(this.employeeModel);

    if (empForm.valid) {

      this.employee$ = this.empservice.addEmployee(empForm.value);
      //empForm.reset();

     // this.route.navigateByUrl('/employee/details/${empForm.value["emp_ID"]}');
    } else {

      console.log('required fields needed encounter');

    }
  }

  onDropDownPositionChange(e:any){
    console.log(e);
    this.selectedpositionval=e;
  }
}
