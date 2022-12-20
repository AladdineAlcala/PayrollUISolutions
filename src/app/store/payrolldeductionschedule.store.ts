import { Injectable, OnDestroy } from '@angular/core';
import { catchError, map, Observable, Subscription, switchMap } from 'rxjs';
import { DeductionDetails } from '../models/deductiondetails';
import { EmpDeductionSettings } from '../models/employeedeductionsettings';
import { PayrollDeductionTrans } from '../models/payrolldeductionscheduletransactions';
import {
  PayrollDeductionTransForCreateDTO,
  PayrollPeriodTransactionCreateDTO,
} from '../models/payrollperiodtransaction';
import { PeriodDeductionSchedule } from '../models/perioddeductionschedule';
import { DeductionService } from '../services/deduction.service';
import { PeriodDeductionScheduleService } from '../services/perioddeductionscheduled.service';
import { BaseStore } from './abstractstore';

interface PayrollDeductionScheduleState {
  isloading: boolean;
  employeedeductiondetails: DeductionDetails[];
  empdeductionsettings: EmpDeductionSettings[];
  payrolldeductionschedtrans: PeriodDeductionSchedule;
   payrolldeductionschedtranslist: PeriodDeductionSchedule[];
  payrolldeductionTrans: PayrollDeductionTrans[];
  payrollperiodtranscreate: PayrollPeriodTransactionCreateDTO;
  hasSave: boolean;
}


/** Important Note:
 * employeedeductiondetails: [{} as DeductionDetails]  <------------- can cause error to initial state become undefined */


const initialState: PayrollDeductionScheduleState = {
  isloading: false,
  hasSave: false,
  employeedeductiondetails: [], 
  empdeductionsettings: [],
  payrolldeductionschedtrans: {} as PeriodDeductionSchedule,
  payrolldeductionschedtranslist:[],
  payrolldeductionTrans: [],
  payrollperiodtranscreate: {} as PayrollPeriodTransactionCreateDTO,
};

@Injectable({ providedIn: 'root' })
export class PayrollDeductionScheduleStore
  extends BaseStore<PayrollDeductionScheduleState>
  implements OnDestroy
{
  private sub: Subscription = new Subscription();

  private isloading: boolean = false;

  employeedeductiondetails$!: Observable<DeductionDetails>;

  constructor(
    private deductionService: DeductionService,
    private periodDeductionService: PeriodDeductionScheduleService
  ) {
    super(initialState);
  }

  load_payrolldeductionschedtranslist(){
    
   return this.periodDeductionService.getallperioddeductiontransschedule().pipe(map(data => {
        if(data.isSuccess){
          this.setState(()=> ({payrolldeductionschedtranslist:[...data.result]}))
        }
   }))

  }


  load_deductionschedule(pNo: number) {
    return this.periodDeductionService.GetDeductionById(pNo).pipe(
      switchMap((response) => {
        if (response.isSuccess) {
          /*  console.log(response.result); */
          //set state hassave to true ,there's already record of payroll number in database. button will be set to delete mode..
          this.setState((state) => ({ hasSave: true }));
        } else {
          //set state hassave to false ,there's no record of payroll number in database. button will be set to delete mode..
          this.setState((state) => ({ hasSave: false }));
        }

        return this.deductionService
          .getAllDeductionDetails()
          .pipe(map((data) => data.result));
      }),
      catchError((err) => err)
    );
  }

  /**Note: watch:----->>   // ...(state.payrollperiodtransaction.payrolldeductiontrans|| [])
      // [...state.payrollperiodtransaction.payrolldeductiontrans,new_deductionscheduletrans] */

  create_deductionscheduleTrans(
    nextperioddeductionscheduletrans: PeriodDeductionSchedule,
    nextdeductionscheduletrans: PayrollDeductionTransForCreateDTO[]
  ) {
    this.setState(() => ({
      payrollperiodtranscreate: {
        perioddeduction_dto: nextperioddeductionscheduletrans,
        payrolDeductionTransList: [...nextdeductionscheduletrans],
      },
    }));
  }

  addempdeductionsetting(empdeductions: EmpDeductionSettings[]) {
    this.setState((state) => ({
      empdeductionsettings: [...state.empdeductionsettings, ...empdeductions],
    }));
  }

  emptydeductionsetting() {
    this.setState(() => ({ empdeductionsettings: [] }));
  }

  addpayrolldeductiontranstostate(
    payrolldeductionTrans: PayrollDeductionTrans[]
  ) {
    this.setState(() => ({ payrolldeductionTrans: [] }));
    this.setState(() => ({
      payrolldeductionTrans: [...payrolldeductionTrans],
    }));
  }

  addpayrolldeductionschedtranstostate = (
    payrolldeductionschedtrans: PeriodDeductionSchedule
  ) =>
    this.setState(() => ({
      payrolldeductionschedtrans: payrolldeductionschedtrans,
    }));

  sethasSave(): void {
    this.setState((state) => ({ hasSave: !state.hasSave }));
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
