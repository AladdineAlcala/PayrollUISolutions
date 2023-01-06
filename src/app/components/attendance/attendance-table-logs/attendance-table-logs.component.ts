import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AttendanceLog } from 'src/app/models/attendancelog';
import { Employee } from 'src/app/models/employee';
import { AttendanceLogsStore } from 'src/app/store/attlogsstore';
import { getdaynum } from 'src/HelperFunctions/Utilities';

export interface TimeLogs {
  ID: string;
  EMPLOYEE: string;
}

@Component({
  selector: 'attendance-logs',
  templateUrl: './attendance-table-logs.component.html',
  styleUrls: ['./attendance-table-logs.component.css'],
  //changeDetection:ChangeDetectionStrategy.OnPush

})
export class AttendanceTableLogsComponent implements OnInit,OnDestroy {
  displayedcolumns: string[] = [];

  dataSource: any = [];

  attlogsSub!:Subscription

  @Input() translogslist$!:Observable<AttendanceLog[]>

  @Input()
    payrollperiod!:FormControl

  dateStart!: Date;
  dateEnd!: Date;

  constructor(private logStore: AttendanceLogsStore,
  //  private changeDetectorRef:ChangeDetectorRef
    
    ) {

      this.attlogsSub=new Subscription;

    
    }
    
    ngOnInit(): void {
      
     const translogs = this.logStore.select((state) => state.attendancelog);

      this.attlogsSub=translogs.subscribe((data) => {
        //console.log(data)
       

        if (data.length > 0 && data != null) {

          this.payrollperiod.enable();

          this.displayedcolumns=[];

          let attranslogs!: AttendanceLog[];
          //------------------------------------------------------------------------------------------------------        
          attranslogs=[...data]
          // console.log(attranslogs)
          
          const distEmployee=attranslogs.filter((x,i,arr)=>arr.findIndex(t => t.EmpID==x.EmpID)===i);
          
          //console.log(distEmployee)
          
          
          //==================================================================================
          let datestart: Date = this.dateStart;
          
          let dateend: Date = this.dateEnd;
          
          let numofdays: number = this.getnumberofdays(datestart,dateend); //get total number of days frem startdate to end date
          
          const strdate: number = getdaynum(datestart);
          
          
          numofdays = numofdays+2;
          
          //-----------------------------------------------------------------------------------------------------------------------
          // Generate columns
          
          
          let datelogstart=strdate;
          
          this.displayedcolumns[0] = 'EmpID';
          this.displayedcolumns[1] = 'Employee';
          
          for (let i =0; i <numofdays; i++) {
            
            
            if (numofdays - i == 1) {
              
              this.displayedcolumns.push('Total Days');
              
            } else {
              
            this.displayedcolumns.push(`${datelogstart++}`);

          }
          
          
        }
        
        //=========================================================================================================================
        //Generate rowcolls employee date
        
        for (let r = 0; r <= distEmployee.length - 1; r++) {
          
          let row: any = new Object();
          
          let total: number = 0;
          
          let totalemplogs: number = 0;
          
          
          let rcolIndex=strdate;
          
          //------------------------------------------------------------------------------------------------------------
           let rownumdays:number=numofdays+1;
          // generate rolcols attendance logs data
          for (let c = 0; c <=rownumdays; c++) {
            
            total = total + c + 1;
            
            if (c == 0) {
              
              row[this.displayedcolumns[c]] = distEmployee[r].EmpID;
              
            } else if (c == 1) {

              row[this.displayedcolumns[c]] = this.getfullname(distEmployee[r].Employee);
              
            } else if (c <rownumdays) {

              //start in index 2
              
              //console.log(`${c} ${rcolIndex}`); 
                 // this will distribute each column and row dynamically

              totalemplogs+=this.getTotalDaysEmpLog(distEmployee[r].EmpID,rcolIndex,attranslogs)==true? 1: 0;                            

              // console.log(this.getEmpAttLog(distEmployee[r].EmpID,rcolIndex,attranslogs))
              row[this.displayedcolumns[c]] = this.getEmpTimeLog(distEmployee[r].EmpID,rcolIndex,attranslogs);

              rcolIndex++

             // console.log(`${c} ${rcolIndex}`); 
              
            } else if (c ==rownumdays) {
            //  ${rcolIndex}
             // console.log(`index from total :${c} `); 
              
              row[this.displayedcolumns[c]] = totalemplogs;
              
            }

            
            
          }

          this.dataSource.push(row);

         // this.changeDetectorRef.detectChanges();
        }
      
        
        //console.log(this.dataSource)
      }

 /*      else{
        
        this.displayedcolumns=[]
        
        
        //==================================================================================
        
        let datestart: Date = this.dateStart;
        
        let dateend: Date = this.dateEnd;
        
        if(dateend!=undefined && datestart!=undefined){
          
          let numofdays: number = this.getnumberofdays(datestart,dateend); //get total number of days frem startdate to end date
          
          const strdate: number = this.getdaynum(datestart);
  
          numofdays = numofdays+2;

          let datelogstart=strdate;


          
          //-----------------------------------------------------------------------------------------------------------------------
          // Generate columns

          
          
          
        this.displayedcolumns[0] = 'EmpID';
        this.displayedcolumns[1] = 'Employee';

        for (let i =0; i <numofdays; i++) {
          
          
          if (numofdays - i == 1) {
            this.displayedcolumns.push('Total Days');
          } else {
            
            this.displayedcolumns.push(`${datelogstart++}`);
          }


        }
        

      }
       
      this.dataSource=[];
      
      // this.changeDetectorRef.markForCheck();
      } */
      
    });
  }
  
  adddate(date: Date, numday: number): string {
    let day = date.getDate() + numday;
    let month = date.getMonth() + 1;
    let yr = date.getFullYear();
    
    return `${yr}-${month}-${day}`;
  }
  
  calculatefooter(i: any) {
    console.log(i);
    
    // return this.dataSource.map((data:any) => data.reduce((acc: any,value: { cell: (arg0: any) => any; }) => acc+=value,0))
  }
  

  
  
  getnumberofdays(dt1:Date,dt2:Date){
    let d1=dt1.getDate();
    let d2=dt2.getDate();
    return d2-d1
  }
  
  getfullname(employee:Employee){
    return`${employee.fname} ${employee.lname}`
  }
  
  getEmpTimeLog(empID:string,intdayoflog:number,logs:AttendanceLog[]):unknown{
    
    return logs.filter(emp=>emp.EmpID==empID).filter(t =>{
      
      return getdaynum(t.datetimeVerify)==intdayoflog;

    }).map(t=>{
      return this.converMHour(t.datetimeVerify)
    }).join(" ");
  }
  
  getTotalDaysEmpLog(empID:string,intdayoflog:number,logs:AttendanceLog[]){
    
    return logs.filter(emp=>emp.EmpID==empID).filter(t =>{
      
      return getdaynum(t.datetimeVerify)==intdayoflog;
      
    }).map(t=>t.verificationMode).includes(0|1)
    
  }
  
  
  converMHour(dt:Date){
    
    let hr=dt.getHours()
    let ampm=hr>=12?"pm":"am";
    hr=(hr%12)||12;
    let min=dt.getMinutes();
    let sec=dt.getSeconds(); 
    
    return`${hr}:${min}${ampm}`
  }


  ngOnDestroy(): void {
    this.attlogsSub && this.attlogsSub.unsubscribe();
  }
  
}

const dummytimelogs: TimeLogs[] = [
  { ID: '0001', EMPLOYEE: 'aladdine alcala' },
  { ID: '0002', EMPLOYEE: 'jourgena alcala' },
  { ID: '0003', EMPLOYEE: 'beatriz alcala' },
  { ID: '0004', EMPLOYEE: 'imelda alcala' },
];
