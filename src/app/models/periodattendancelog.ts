import { Employee } from "./employee"
import { PayrollPeriod } from "./payrollperiod"


export interface PeriodAttLogs{
    logId:number,
    emp_Id:string,
    pp_id:number,
    dateLog:Date,
    timeLog:string,
    logMode:number
    verificationMode:number,
    workCode:number,

    employee:Employee
    payrollPeriod:PayrollPeriod
}