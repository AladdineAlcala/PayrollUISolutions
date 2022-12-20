import { DeductionDetails } from "./deductiondetails"
import { Employee } from "./employee"
import {PayrollPeriodTransaction} from "./payrollperiodtransaction"

export interface EmpDeductionSettings{

    empdeduction_Id:string;
    emp_Id:string;
    deduction_Id:string;
    d_amount:number;
    is_active:boolean;
    
    employee:Employee;
    deductionDetails:DeductionDetails;

    createdOn?:Date;
    updatedOn?:Date;
    lastAccessed?:Date;
}



