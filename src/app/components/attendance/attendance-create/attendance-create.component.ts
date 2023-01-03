import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AttendanceLogService } from 'src/app/services/attendancelog.service';
import {
  AttendanceLog,
  AttendanceLogFetch,
  AttendanceLogCreate,
} from 'src/app/models/attendancelog';
import { EmployeeService } from 'src/app/services/employee.service';
import { forkJoin, map, Observable } from 'rxjs';
import { ConvertID } from 'src/HelperFunctions/Utilities';
import { AttendanceLogsStore } from 'src/app/store/attlogsstore';
import { EmployeeStore } from 'src/app/store/employee.store';
import { AttendanceTableLogsComponent } from '../attendance-table-logs/attendance-table-logs.component';
import { PayrollPeriod } from 'src/app/models/payrollperiod';
import { PayrollPeriodStore } from 'src/app/store/payrollperiod.store';

@Component({
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.component.html',
  styleUrls: ['./attendance-create.component.css'],
})
export class AttendanceCreateComponent implements OnInit {
  title: string = 'Create DTR Logs';

  attfetchlogs: AttendanceLogFetch[];

  payrollperiod!: PayrollPeriod[];

  attranslogs$!: Observable<AttendanceLog[]>;

  attlogForm!: FormGroup;

  _datestart!: Date;
  _dateend!: Date;

  @ViewChild(AttendanceTableLogsComponent)
  attlogcomp!: AttendanceTableLogsComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logsService: AttendanceLogService,
    private logstore: AttendanceLogsStore,
    private empservice: EmployeeService,
    private empstore: EmployeeStore,
    private fb: FormBuilder,
    private ppStore: PayrollPeriodStore
  ) {
    this.initForm();

    this.attfetchlogs = [];
    this.attranslogs$ = new Observable<AttendanceLog[]>();
  }

  //tempDate = new Date().setMonth(new Date().getMonth() - 1)

  public initForm(): void {
    this.attlogForm = this.fb.group({
      payrollperiod: [{ value: '', disabled: true }, Validators.required],
      logrange: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required],
      }),
    });
  }

  get rangeStart() {
    return this.attlogForm.get('logrange')?.get('start') as FormControl;
  }

  get rangeEnd() {
    return this.attlogForm.get('logrange')?.get('end') as FormControl;
  }

  ngOnInit(): void {
    this.ppStore
      .select((state) => state.payrollperiods)
      .subscribe((data) => {
        // console.log(data);
        this.payrollperiod = data;
      });
  }

  onClose() {
    //console.log('closer');
    this.router.navigate(['', { outlets: { main: ['attendance', 'main'] } }], {
      relativeTo: this.activatedRoute,
    });
  }

  ondaterangeChange(
    daterangeStart: HTMLInputElement,
    daterangeEnd: HTMLInputElement
  ) {
    let attendancedetailsList: AttendanceLog[] = [];

    let datestart = isvalidDate(daterangeStart.value);

    let dateend = isvalidDate(daterangeEnd.value);

    if (datestart == true && dateend == true) {
      //call api service

      this._datestart = new Date(daterangeStart.value);
      this._dateend = new Date(daterangeEnd.value);

      this.attlogcomp.dateStart = this._datestart;
      this.attlogcomp.dateEnd = this._dateend;

      //const logs$=this.logstore.select(state=> state.attlogfetch);

      const logs$ = this.logsService.getlogs(this._datestart, this._dateend);

      const employees$ = this.empservice.getEmployees$;

      this.attranslogs$ = forkJoin([logs$, employees$]).pipe(
        map(([logs, emps]) => {
          logs.map((log) => {
            let attlog: AttendanceLog = {
              indexNo: log.lCount,
              EmpID:
                emps.find((e) => ConvertID(e.emp_Id) == +log.enrollNumber)
                  ?.emp_Id || log.enrollNumber,
              verificationMode: log.verifyMode,
              inoutMode: log.inOutMode,
              datetimeVerify: new Date(log.dateTimeVerify),
              workcode: log.workcode,
              Employee: emps.find(
                (e) => ConvertID(e.emp_Id) == +log.enrollNumber
              )!,
            };

            attendancedetailsList.push(attlog);
          });

          return attendancedetailsList;
        })
      );

      this.attranslogs$.subscribe((data) => {
        //  console.log(data)
        if (data.length > 0) {
          this.logstore.set_attendancelogs([...data]);

          console.log(data);
          //this.attlogForm.controls['payrollperiod'].enable();
        }
      });
    }
  }

  onSubmitLogs() {
    if (this.attlogForm.valid) {

       const {payrollperiod}=this.attlogForm.value;

       this.logstore.select(state=> state.attendancelog).subscribe(data =>{

        let save_createdlogs={
          pp_id:payrollperiod,
          logs:data
        }

        //save to database
        this.logsService.postlogs(save_createdlogs)
        .subscribe(result => console.log(result))

        console.log(save_createdlogs)
       })
    }


  }

  resetFormLogs() {
    this.attlogcomp.displayedcolumns = [];
    this.attlogForm.reset();
    this, this.initForm();
  }

/*   loglistforcreate(logs: AttendanceLog[], payperiod: number) {
    const createlogs: AttendanceLogCreate[] = [];

      logs.map((log) => {
      let createdlog = {
        emp_Id: log.EmpID,
        verificationMode: log.verificationMode,
        datetimeVerify: log.datetimeVerify,
        inoutMode: log.inoutMode,
        pp_id: payperiod,
      };
      createlogs.push(createdlog);

    });

  } */



}

function isvalidDate(testdate: string) {
  let date = Date.parse(testdate);

  if (isNaN(date)) {
    return false;
  }
  return true;
}
