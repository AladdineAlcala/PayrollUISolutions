import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, delay, first, forkJoin, map, Observable, switchMap } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { DeductionScheduleTrans, EmpDeductionTransaction } from 'src/app/models/deductionscheduletransaction';
import { EmpDeductionSettings } from 'src/app/models/employeedeductionsettings';
import { PayrollDeductionTrans } from 'src/app/models/payrolldeductionscheduletransactions';
import {

  PeriodDeductionScheduleForCreationDTO,
} from 'src/app/models/payrollperiodtransaction';

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

  
  empdeductions!: EmpDeductionSettings[];
  
  pp_Id!:number;
  paramsMode!:string

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private perioddeuctionservice: EmployeeDeductionsScheduleService,
    private payrollperioddeductionservice: PeriodDeductionScheduleService,
    private payrolldeductionscheduleStore: PayrollDeductionScheduleStore
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

     // this.empdeductionlist$.subscribe(t=> console.log(t))

/* 
      this.empdeductionlist$
      .pipe(
        map((deductions) =>
          deductions.filter((t) => t.empDeductionSettings.length > 0)
        )
      ) */
          //this.empdeductions=[...(this.empdeductions|| []),...t.empDeductionSettings]
          // const newpayrolldeductionTrans:PayrollDeductionTrans={pNo:this.payrollperiod,emp_ID:}

         

          // this.payrolldeductionscheduleStore
          //  this.loadingservice.loadingOff();
      

        //this.ref.detectChanges();



    }
    /** EDIT MODE */
    else{

      let obs2$ =this.payrolldeductionscheduleStore.loadperioddeductiontransactionbypayroll(this.pp_Id);

      let obs1$ = this.payrolldeductionscheduleStore.load_deductiondetails();

      const join$ = forkJoin([obs1$, obs2$]).pipe(
        
        map(([obs1, obs2]) => {

          let empdeductiontransaction:EmpDeductionTransaction[]=[];

          const {payrollDeductionTransaction,pdsched_Id,pp_id} =obs2

          payrollDeductionTransaction.map((element:any) => {

            let empdeductiontrans: EmpDeductionTransaction = {
              prldeductiontrans_Id: element.prldeductiontrans_Id,
              pdsched_Id:pdsched_Id,
              deduction_Id:element.deduction_Id,
              emp_Id: element.emp_Id,
              emp_First:element.employee.fname,
              emp_Last:element.employee.lname,
              deductAmount: element.deductAmount,
              actualDeductedAmount: element.actualDeductedAmount,
            };

            empdeductiontransaction.push(empdeductiontrans);
          })

          let deductionscheduletrans: DeductionScheduleTrans[] = [];

          obs1.map((_mapdata: { deduction_Id: any; description: any }) => {

            let deductionsched: DeductionScheduleTrans = {

              pp_Id:pp_id,
              pdsched_Id: pdsched_Id,
              deduction_Id: _mapdata.deduction_Id,
              description: _mapdata.description,
            
            } as DeductionScheduleTrans;
            deductionscheduletrans.push(deductionsched); 
          });
            
          return [deductionscheduletrans.map(dtrans=>{
            return{...dtrans,empdeductiontrans:empdeductiontransaction.filter(t=>t.deduction_Id==dtrans.deduction_Id)}
          })];
        })
      );

      join$.subscribe((res) => console.log(res));


    }

 



  }

  onSavePayrollDeductionTrans() {
    const savingloadermessage: string = 'Pls wait while saving record...';

    this.loadingService.loadingOn(savingloadermessage);

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
          this.loadingService.loadingOff();

          this.payrolldeductionscheduleStore.sethasSave();

          this.hasSave$ = this.payrolldeductionscheduleStore.select(
            (state) => state.hasSave
          );
        }
      });



  }
}
