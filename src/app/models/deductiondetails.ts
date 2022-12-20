import { EmpDeductionSettings } from "./employeedeductionsettings";
import { PayrollDeductionTrans } from "./payrolldeductionscheduletransactions";

export interface DeductionDetails{

    deduction_Id:string;
    deduction_type:string;
    description:string;
    deductioncode:string;
    is_defualt:boolean;
    _freq_flag:number;
   /*  createdOn:Date
    updatedOn:Date
    lastAccessed:Date */

    empDeductionSettings:EmpDeductionSettings[]
    payrollDeductionsTrans:PayrollDeductionTrans[]
}