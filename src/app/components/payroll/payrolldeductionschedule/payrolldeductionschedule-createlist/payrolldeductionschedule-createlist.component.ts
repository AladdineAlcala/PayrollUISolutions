import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, first, map, Observable, switchMap } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { PayrollDeductionTrans } from 'src/app/models/payrolldeductionscheduletransactions';
import {
  PayrollPeriodTransaction,
  PayrollPeriodTransactionCreateDTO,
  PeriodDeductionScheduleForCreationDTO,
} from 'src/app/models/payrollperiodtransaction';
import { PeriodDeductionSchedule } from 'src/app/models/perioddeductionschedule';
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import { EmployeeDeductionsScheduleService } from 'src/app/services/employeedeductionschedule.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PeriodDeductionScheduleService } from 'src/app/services/perioddeductionscheduled.service';
import { PayrollDeductionScheduleStore } from 'src/app/store/payrolldeductionschedule.store';

@Component({
  selector: 'app-payrolldeductionschedule-createlist',
  templateUrl: './payrolldeductionschedule-createlist.component.html',
  styleUrls: ['./payrolldeductionschedule-createlist.component.css'],
})
export class PayrolldeductionscheduleCreatelistComponent implements OnInit {
  title: string = 'Payroll Deduction Schedule';

  empdeductionlist$!: Observable<DeductionDetails[]>;

  hasSave$: Observable<boolean> = new Observable<boolean>();

  payrolldeductionTrans!: PayrollDeductionTrans[];

  private payrollperiod!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private perioddeuctionservice: EmployeeDeductionsScheduleService,
    private payrollperioddeductionservice: PeriodDeductionScheduleService,
    private payrolldeductionscheduleStore: PayrollDeductionScheduleStore
  ) {
    this.payrolldeductionTrans = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.payrollperiod = params['period'];
    });

    this.empdeductionlist$ =
      this.payrolldeductionscheduleStore.load_deductionschedule(
        this.payrollperiod
      );

    this.payrolldeductionscheduleStore.select(
      (state) => state.employeedeductiondetails
    );

    this.hasSave$ = this.payrolldeductionscheduleStore.select(
      (state) => state.hasSave
    );
/*     this.empdeductionlist$.subscribe(result =>{
       console.log(result);
      result.map(t=>{
         
        this.payrolldeductionscheduleStore.addempdeductionsetting(t.empDeductionSettings) 
      })

    });  */
  }

  onSavePayrollDeductionTrans() {
    const savingloadermessage: string = 'Pls wait while saving record...';

    this.loadingService.loadingOn(savingloadermessage);

    //route to: Post [Route("api/perioddeductionschedule")]   => PeriodDeductionScheduleServiceController
    //get deduction employee settings

    //1 . send http post to server to generate payrollperiod id
    const perioddeductionsched: PeriodDeductionScheduleForCreationDTO = {
      pp_id: +this.payrollperiod,
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
          this.loadingService.loadingOff();

          this.payrolldeductionscheduleStore.sethasSave();

          this.hasSave$ = this.payrolldeductionscheduleStore.select(
            (state) => state.hasSave
          );
        }
      });



  }
}
