import { Injectable, OnDestroy } from '@angular/core';
import {
  catchError,
  EMPTY,
  forkJoin,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { DeductionDetails } from '../models/deductiondetails';
import {
  DeductionScheduleTrans,
  EmpDeductionTransaction,
} from '../models/deductionscheduletransaction';
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
  deductionscheduletrans: DeductionScheduleTrans[]; // < ---------------------- used for deduction transaction with payroll periods  included entites [pp_Id , pdsched_Id ,deduction_Id, description , EmpDeductionTransaction[]  used for payroll daduction schedule with payroll period parameter ]
  payrolldeductionschedtrans: PeriodDeductionSchedule; // < ----------------- raw data from period dedcution schedule  included entities [ pdsched_Id ,pp_id ,PayrollPeriod, PayrollDeductionTrans[]]
  payrolldeductionschedtranslist: PeriodDeductionSchedule[];
  payrolldeductionTrans: PayrollDeductionTrans[]; //<-----------------------  payroll deduction trans array of
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
  payrolldeductionschedtranslist: [],
  payrolldeductionTrans: [],
  payrollperiodtranscreate: {} as PayrollPeriodTransactionCreateDTO,
  deductionscheduletrans: [],
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

  load_payrolldeductionschedtranslist() {
    return this.periodDeductionService
      .getallperioddeductiontransschedule()
      .pipe(
        map((data) => {
          if (data.isSuccess) {
            // console.log(data);
            this.setState(() => ({
              payrolldeductionschedtranslist: [...data.result],
            }));
            return data.result;
          }
        })
      );
  }

  loadperioddeductiontransactionbypayroll(payrollperiod: number) {
    return this.periodDeductionService
    .getperioddeductiontransactionbypayroll(payrollperiod)
    .pipe(
      map((data) => {
        if (data.isSuccess) {
          //set to state

         // console.log(data.result);

          return data.result;
        }

        return EMPTY;
      })
    );

  }

  load_deductiondetails() {

    return this.deductionService.getAllDeductionDetails().pipe(
      map((data) => {
        this.setState(() => ({ employeedeductiondetails: [...data.result] }));
        return data.result;
      })
    );

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
  

  load_jointdeductiondetails$(pp_id:number): Observable<DeductionScheduleTrans[]>{

    let obs2$ =this.loadperioddeductiontransactionbypayroll(pp_id);
      
    let obs1$ = this.load_deductiondetails();

      return forkJoin([ obs1$,obs2$]).pipe(
      
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
            iseditable:false
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

       
        const deductionscheduletrans$=deductionscheduletrans.map(dtrans=>{

          return{...dtrans,empdeductiontrans:empdeductiontransaction.filter(t=>t.deduction_Id==dtrans.deduction_Id)}
        });

        this.setState(()=> ({deductionscheduletrans:[]}))

        this.setState(()=> ({deductionscheduletrans:[...deductionscheduletrans$]}))


        return deductionscheduletrans$
      })
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
