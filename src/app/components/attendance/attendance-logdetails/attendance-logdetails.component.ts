
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { delay, map, mergeMap, Observable, switchMap } from 'rxjs';
import { EmpLogView } from 'src/app/models/logattendanceview';
import { PayrollPeriod } from 'src/app/models/payrollperiod';
import { PeriodAttLogs } from 'src/app/models/periodattendancelog';
import { AttendanceLogService } from 'src/app/services/attendancelog.service';
import { PayrollperiodService } from 'src/app/services/payrollperiod.service';
import { PayrollPeriodStore } from 'src/app/store/payrollperiod.store';

@Component({
  selector: 'app-attendance-logdetails',
  templateUrl: './attendance-logdetails.component.html',
  styleUrls: ['./attendance-logdetails.component.css']
})
export class AttendanceLogdetailsComponent implements OnInit {

  title:string="Attendance Log Details"
  
  payrollperiod!:PayrollPeriod

  pp_id!:number

  attlogs$!:Observable<PeriodAttLogs[]>

  attlogsEmpView$!:Observable<PeriodAttLogs[]>

  constructor(
  private router:Router,
  private activatedRoute:ActivatedRoute,
  private attlogservice:AttendanceLogService,
  private payrollperiodService:PayrollperiodService,
  private payperiodstore:PayrollPeriodStore
  ) {

    this.pp_id = this.activatedRoute.snapshot.params['payperiod'];
    
    this.attlogsEmpView$=new Observable<PeriodAttLogs[]>()

    
    this.activatedRoute.params.pipe(switchMap(param=>this.payperiodstore.select(state => state.payrollperiods).pipe(map(data => data.find(t=>t.pp_id==param['payperiod']))))
    ).subscribe(res => {
     // console.log(res);
   /*    this.pp_id=res?.pp_id!, */
      this.payrollperiod=res!
      
    });
  

  }


  ngOnInit(): void {
   // console.log(`ppid ${this.pp_id}`)
    this.attlogs$=this.attlogservice.getlogsbyPeriod(this.pp_id)
    .pipe(map(data => {
        if(data.isSuccess){
          return data.result
        }
    })) 
    
  }
  
  onClose(){

    this.router.navigate(['', { outlets: { main: ['attendance'] } }], {
      relativeTo: this.activatedRoute,
    });

  }

  selectedEmpLogEvt(ev:EmpLogView):void{
   // console.log(ev)
  
   this.attlogsEmpView$= this.attlogs$.pipe(delay(1000),
                         map(data => data.filter(log=>log.emp_Id==ev.empId && log.pp_id ==this.pp_id)))
                        
  
  }

}
