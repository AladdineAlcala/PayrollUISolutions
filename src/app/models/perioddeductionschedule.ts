import { PayrollDeductionTrans } from "./payrolldeductionscheduletransactions"
import { PayrollPeriod } from "./payrollperiod"


export interface PeriodDeductionSchedule{
    pdsched_Id?:number,
    pp_id:number,

    payrollPeriod:PayrollPeriod,

    payrollDeductionTransaction:PayrollDeductionTrans[]

}