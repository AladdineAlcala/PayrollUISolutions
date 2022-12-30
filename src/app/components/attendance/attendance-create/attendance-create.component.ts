import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import { AttendanceLogService } from 'src/app/services/attendancelog.service';
import { AttendanceLog, AttendanceLogFetch } from 'src/app/models/attendancelog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { combineLatest, forkJoin, map, Observable } from 'rxjs';
import { ConvertID } from 'src/HelperFunctions/Utilities';
import { AttendanceLogsStore } from 'src/app/store/attlogsstore';
import { EmployeeStore } from 'src/app/store/employee.store';
import { AttendanceTableLogsComponent } from '../attendance-table-logs/attendance-table-logs.component';

@Component({
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.component.html',
  styleUrls: ['./attendance-create.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
 
})
export class AttendanceCreateComponent {

  title:string="Create DTR Logs";

  attfetchlogs:AttendanceLogFetch[]
  
  attranslogs$!:Observable<AttendanceLog[]>

  _datestart!:Date
  _dateend!:Date
 
  attlogrange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild(AttendanceTableLogsComponent)
    attlogcomp!:AttendanceTableLogsComponent



  constructor(private router:Router, 
    private activatedRoute:ActivatedRoute,
    private logsService:AttendanceLogService,
    private logstore:AttendanceLogsStore,
    private empservice:EmployeeService,
    private empstore:EmployeeStore
    ) {

      this.attfetchlogs=[]
     
  }
  
  onClose(){
    //console.log('closer');
    this.router.navigate(['',{outlets:{main:['attendance','main']}}], {relativeTo: this.activatedRoute});

  }


  ondaterangeChange(daterangeStart:HTMLInputElement,daterangeEnd:HTMLInputElement){

    
    let attendancedetailsList:AttendanceLog[]=[];

    let datestart=isvalidDate(daterangeStart.value);

    let dateend=isvalidDate(daterangeEnd.value)
  
     if(datestart==true && dateend==true){

      //call api service

      this._datestart=new Date(daterangeStart.value);
      this._dateend=new Date(daterangeEnd.value)
      
      this.attlogcomp.dateStart=this._datestart
      this.attlogcomp.dateEnd=this._dateend


     //const logs$=this.logstore.select(state=> state.attlogfetch);

       const logs$= this.logsService.getlogs(this._datestart,this._dateend)

       const employees$=this.empservice.getEmployees$;

       this.attranslogs$=forkJoin([logs$,employees$]).pipe(map(([logs,emps]) => {

        logs.map(log => {

				let attlog:AttendanceLog={

                indexNo:log.lCount,
                EmpID:emps.find(e=> ConvertID(e.emp_Id)==+log.enrollNumber)?.emp_Id || log.enrollNumber,
                verificationMode:log.verifyMode ,
                inoutMode:log.inOutMode,
                datetimeVerify:new Date(log.dateTimeVerify),
                workcode:log.workcode,
                Employee:emps.find(e =>ConvertID(e.emp_Id)==+log.enrollNumber)!
              }
              
              attendancedetailsList.push(attlog); 

            })

        
         return attendancedetailsList
    }))

    this.attranslogs$.subscribe(data => {

      this.logstore.set_attendancelogs([...data]);   
      
    })  
     
  }
  
  }

}


function isvalidDate(testdate:string) {
  let date= Date.parse(testdate)

  if(isNaN(date)){
    return false;
  }
  return true
}

