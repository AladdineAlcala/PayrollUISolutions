import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject,pipe,map,tap, Observable, delay } from 'rxjs';
import { FinalAttLogs, FinalAttLogsUpdate, ModifyLogs } from 'src/app/models/attendancelog';
import { LogsView } from 'src/app/models/logattendanceview';
import { AttendanceLogService } from 'src/app/services/attendancelog.service';
import {toFormControl} from 'src/HelperFunctions/Utilities'

@Component({
  selector: 'table-logs',
  templateUrl: './attendance-logdatails-table-logs.component.html',
  styleUrls: ['./attendance-logdatails-table-logs.component.css']
})
export class AttendanceLogdatailsTableLogsComponent implements OnInit {

  @Input() logs$!: Observable<FinalAttLogs[]>;

  loadingsubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isloading$: Observable<boolean> = this.loadingsubj.asObservable();

  logsviewlist: LogsView[] = [];

  controls!:FormArray;

  viewflag!:boolean

  viewflagsubj!:BehaviorSubject<boolean>

  logsforupdatelist!:LogsView[]



  constructor(private logservice:AttendanceLogService) {
    
    this.viewflag=true;
    this.viewflagsubj=new BehaviorSubject<boolean>(this.viewflag);
    
    this.logsforupdatelist=[];
  }


/**------------------------------------------------------------------------------- */
/** This method will updated time in component and send data to backend for update */

  onEditlog():void{

     //check if user is authorize on this operation
     //update to database

   if(this.viewflag===true){

    this.viewflag=!this.viewflag;
    this.vflagsubj();

    this.logsforupdatelist=[];

   } 
   else{

    this.loadingsubj.next(true);

      //call api service
     this.logservice.updatelogs(this.logsforupdatelist)
     .pipe(delay(2000),tap(log => console.log(log)),map(data =>{
          if(data.isSuccess){
            return data.result
          }
     })).subscribe(result =>{

      this.loadingsubj.next(false);

     }); 
     

     //console.log(this.logsforupdatelist)

     //set viewflag to true or default value
     this.viewflag=!this.viewflag;
     this.vflagsubj();
     
     //empty list of updates
     this.logsforupdatelist=[];

   }
   

  }

  /**------------------------------------------------------------------------------ */


  onrefreshlog():void{

    this.viewflag=true
    this.vflagsubj();

  }

  vflagsubj(){
    return this.viewflagsubj.next(this.viewflag)
  }

  get toformcontrol(){
    return toFormControl;
  }


  ngOnInit(): void {

    this.loadingsubj.next(true);

    this.logs$.subscribe((data) => {

    this.logsviewlist=data.map((res) => {

        return {
          indexNo:res.indexNo,
          em_Id: res.emp_Id,
          pp_id: res.pp_id,
          logdate: res.date_in,
          logtimeINAM: formatTime(checkvalidTime(res.time_inAM)!),
          logtimeOUTAM: formatTime(checkvalidTime(res.time_outAM)!),
          logtimeINPM: formatTime(checkvalidTime(res.time_inPM)!),
          logtimeOUTPM: formatTime(checkvalidTime(res.time_outPM)!),
          //is_editmode: false,
        } as LogsView;
      });


      const toformgroup=this.logsviewlist.map(entity => {

        return new FormGroup({

          logtimeINAM:new FormControl(entity.logtimeINAM,Validators.pattern("([01]?[0-9]|2[0-3]):[0-5][0-9]")),
          logtimeOUTAM:new FormControl(entity.logtimeOUTAM,Validators.pattern("([01]?[0-9]|2[0-3]):[0-5][0-9]")),
          logtimeINPM:new FormControl(entity.logtimeINPM,Validators.pattern("([01]?[0-9]|2[0-3]):[0-5][0-9]")),
          logtimeOUTPM:new FormControl(entity.logtimeOUTPM,Validators.pattern("([01]?[0-9]|2[0-3]):[0-5][0-9]")),

        })
      })
      
      this.controls=new FormArray(toformgroup);

      this.loadingsubj.next(false);

    });

    /** END OF SUBXECRIPTION  */
  }

  getControl(index:number,field:string){
    return this.controls.at(index).get(field)
  }


/**------------------------------------------------------------------------------- */
/** This method will updated time in component and send data to backend for update */

  updateField(index:number,field:string):void{

    const control=this.getControl(index,field);

    if(control?.valid){

      this.logsviewlist=this.logsviewlist.map((e,i)=>{

        if(index===i){

            const logupdate={...e,[field]:control.value}

             const logexist=this.logsforupdatelist.find(log => log.indexNo===logupdate.indexNo); 

             if(!logexist){
                this.logsforupdatelist.push(logupdate);
             }
             else{
                 
                const up=this.logsforupdatelist.map(l => {

                    if(l.indexNo===logexist.indexNo){
                    
                      return({...l,...logupdate})
                    }
                  return l;
              });

               this.logsforupdatelist=up.slice(0);
             }
          
         // console.log(this.logsforupdatelist)

          return {...e,[field]:control.value}
        }
        
        return e;
      })

     
      //get service operation


    }
  }

  /**------------------------------------------------------------------------------------ */



}


function formatTime(strtime?:string):string {

  const timelog:string=`${strtime?.split(':')[0]}:${strtime?.split(':')[1]}`;

  return strtime!=undefined? timelog:''
}



function checkvalidTime(strtime?:string){
  if(strtime!= undefined){

    let hr:number=parseInt(strtime.split(':')[0]);
    return hr > 0? strtime : null;
  }

  return null;

}



/* export function getlogtime(
      ampm: string,
      logmode: number,
      emp: string,
      logdatefilter: Date,
      data: PeriodAttLogs[]
    ):logTimeType {
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

          const timelog:logTimeType=({id:_gettimelog &&  _gettimelog.logId,logtime:`${_gettimelog?.timeLog.split(':')[0]}:${_gettimelog?.timeLog.split(':')[1]}`})

        return _gettimelog!=undefined ? timelog : {} as logTimeType

      //console.log(`${timel?.emp_Id} ${timel?.dateLog} ${timel?.timeLog}`)

  } */