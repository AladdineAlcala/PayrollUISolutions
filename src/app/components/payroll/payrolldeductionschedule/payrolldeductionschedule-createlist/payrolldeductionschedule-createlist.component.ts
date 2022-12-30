import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { combineLatest, delay, first, forkJoin, map, Observable, switchMap, take } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { DeductionScheduleTrans, EmpDeductionTransaction } from 'src/app/models/deductionscheduletransaction';
import { EmpDeductionSettings } from 'src/app/models/employeedeductionsettings';
import { PayrollDeductionTrans } from 'src/app/models/payrolldeductionscheduletransactions';
import {

  PeriodDeductionScheduleForCreationDTO,
} from 'src/app/models/payrollperiodtransaction';
import { PeriodDeductionSchedule } from 'src/app/models/perioddeductionschedule';

import { EmployeeDeductionsScheduleService } from 'src/app/services/employeedeductionschedule.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PeriodDeductionScheduleService } from 'src/app/services/perioddeductionscheduled.service';
import { PayrollDeductionScheduleStore } from 'src/app/store/payrolldeductionschedule.store';

@Component({
  selector: 'app-payrolldeductionschedule-createlist',
  templateUrl: './payrolldeductionschedule-createlist.component.html',
  styleUrls: ['./payrolldeductionschedule-createlist.component.css'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrolldeductionscheduleCreatelistComponent implements OnInit {
  title: string = 'Payroll Deduction Schedule';

  empdeductionlist$!: Observable<DeductionDetails[]>;
 
  hasSave$: Observable<boolean> = new Observable<boolean>();

  payrolldeductionTrans!: PayrollDeductionTrans[];

  
  empdeductions!: EmpDeductionSettings[];
  
  pp_Id!:number;
  paramsMode!:string

  jointdeductiondetails$!: Observable<DeductionScheduleTrans[]>;

 
  onClose(){
    //console.log('closer');
    this.router.navigate(['',{ outlets: {side:'payroll',main:null} }]);

  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingspinner: NgxSpinnerService,
    private perioddeuctionservice: EmployeeDeductionsScheduleService,
    private payrollperioddeductionservice: PeriodDeductionScheduleService,
    private payrolldeductionscheduleStore: PayrollDeductionScheduleStore,
    private ref: ChangeDetectorRef,
    private router:Router
  ) {
    this.payrolldeductionTrans = [];

    const comobs = combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]);

    comobs.subscribe(([params, queryParams]) => {
      this.paramsMode = queryParams['mode'];
      this.pp_Id = +params['_payperiod'];
    });
    
  }

  ngOnInit(): void {

    /** check paramete mode
     *  ADD MODE
     */
    if(this.paramsMode==='add'){

      this.empdeductionlist$=this.payrolldeductionscheduleStore.load_deductionschedule(this.pp_Id)

    // this.empdeductionlist$= this.payrolldeductionscheduleStore.select((state) => state.employeedeductiondetails);
    

      this.hasSave$ = this.payrolldeductionscheduleStore.select(
        (state) => state.hasSave
      );

    }
    /** EDIT MODE */
    else{
      
        
        this.payrolldeductionscheduleStore.load_jointdeductiondetails$(this.pp_Id)
        .pipe(delay(2000)).subscribe();
       

        this.payrolldeductionscheduleStore.sethasSave();

        this.hasSave$ = this.payrolldeductionscheduleStore.select(
          (state) => state.hasSave
        )
          
       // this.hasSave$.subscribe(result=>console.log(result))
    }

 



  }

  onSavePayrollDeductionTrans() {

    const savingloadermessage: string = 'Pls wait while saving record...';

    this.loadingspinner.show();

    //route to: Post [Route("api/perioddeductionschedule")]   => PeriodDeductionScheduleServiceController
    //get deduction employee settings

    //1 . send http post to server to generate payrollperiod id
    const perioddeductionsched: PeriodDeductionScheduleForCreationDTO = {
      pp_id: +this.pp_Id,
    };

    this.payrollperioddeductionservice
      .generatepayrolldeductionschedule(perioddeductionsched)
      .pipe(
        switchMap((response) => {

          if (response.isSuccess) {
            
            const deductionsettings = this.payrolldeductionscheduleStore.select(
              (state) => state.empdeductionsettings
            );

            deductionsettings.subscribe((data) => {
            
              data.map((t) => {
                
                const newpayrolldeductionTrans = {
                  pdsched_Id:response.result.pdsched_Id,
                  emp_Id: t.emp_Id,
                  deduction_Id: t.deduction_Id,
                  deductAmount: t.d_amount,
                  actualDeductedAmount: t.d_amount,
                };

                this.payrolldeductionTrans.push(newpayrolldeductionTrans);
              });


            });
          }


          //post deduction schedule to database
          return this.perioddeuctionservice.addemployeeDeductionSetting([...this.payrolldeductionTrans])


        })
      ).pipe(delay(3000)).subscribe((result) => {
        if (result.isSuccess) {
         // console.log(result);
          this.loadingspinner.hide();

          this.payrolldeductionscheduleStore.sethasSave();

          this.hasSave$ = this.payrolldeductionscheduleStore.select(
            (state) => state.hasSave
          );
        }
      });



  }
}
