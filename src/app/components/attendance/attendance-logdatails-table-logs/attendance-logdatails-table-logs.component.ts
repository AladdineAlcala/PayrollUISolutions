import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { arrow } from '@popperjs/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttendanceLog } from 'src/app/models/attendancelog';
import { LogsView } from 'src/app/models/logattendanceview';
import { PeriodAttLogs } from 'src/app/models/periodattendancelog';
import { getdaynum, tofullname } from 'src/HelperFunctions/Utilities';

@Component({
  selector: 'table-logs',
  templateUrl: './attendance-logdatails-table-logs.component.html',
  styleUrls: ['./attendance-logdatails-table-logs.component.css'],
})
export class AttendanceLogdatailsTableLogsComponent implements OnInit {

  @Input() logs$!: Observable<PeriodAttLogs[]>;

  loadingsubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isloading$:Observable<boolean>=this.loadingsubj.asObservable();

  dataSource = new MatTableDataSource<LogsView>();

  displayedColumns: string[] = ['em_Id','fullname','position'];

  logsviewlist: LogsView[] = [];

  constructor() {
   // this.logs$=new Observable<PeriodAttLogs[]>();
  }

  ngOnInit(): void {

    this.loadingsubj.next(true);

    this.logs$.subscribe((data) => {
      const filtereddateEmp = data
        .filter(
          (val, index, arr) =>
            arr.findIndex((d) =>
                getdaynum(d.dateLog) === getdaynum(val.dateLog) &&
                d.emp_Id === val.emp_Id
            ) === index
          )
          .sort((a, b) => (a.dateLog < b.dateLog ? -1 : 1))
          .map((res) => {
              return {    
                em_Id: res.emp_Id,
                pp_id: res.pp_id,
                fullname:tofullname(res.employee),
                position:res.employee.position.positionName,
                logdate: res.dateLog,
                logtimeINAM: getlogtime('am', 0, res.emp_Id, res.dateLog, data),
                logtimeOUTAM: getlogtime('am', 1, res.emp_Id, res.dateLog, data),
                logtimeINPM: getlogtime('pm', 0, res.emp_Id, res.dateLog, data),
                logtimeOUTPM: getlogtime('pm', 1, res.emp_Id, res.dateLog, data),
              };

          });

          console.log(filtereddateEmp);
         //this.dataSource.data=filtereddateEmp
         this.logsviewlist=[...filtereddateEmp]

         this.loadingsubj.next(false);
    });


    /** END OF SUBXECRIPTION  */
  }
}

export function getlogtime(
  ampm: string,
  logmode: number,
  emp: string,
  logdatefilter: Date,
  data: PeriodAttLogs[]
) {
  const filterempdate= data.filter((ele) => ele.emp_Id === emp && getdaynum(ele.dateLog) === getdaynum(logdatefilter))
  //console.log(filterempdate)
    const _gettimelog=filterempdate.find((t) => {

        if(typeof(t.timeLog)==='string'){

          
          const hr = parseInt(t.timeLog.split(':')[0]);
          let _ampm = hr >= 12 ? 'pm' : 'am';

          if (t.logMode === logmode && _ampm === ampm) return t;

        }

        return null; 

      });

    return _gettimelog?.timeLog!=undefined ?  `${_gettimelog?.timeLog.split(':')[0]}:${_gettimelog?.timeLog.split(':')[1]}` : ''

  //console.log(`${timel?.emp_Id} ${timel?.dateLog} ${timel?.timeLog}`)

}
