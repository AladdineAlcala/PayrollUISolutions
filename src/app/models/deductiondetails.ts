import { EmpDeductionSettings } from "./employeedeductionsettings";

export interface DeductionDetails{

    d_Id:string;
    d_type:string;
    description:string;
    deductioncode:string;
    is_defualt:boolean;
   /*  createdOn:Date
    updatedOn:Date
    lastAccessed:Date */

    empDeductionSettings:EmpDeductionSettings[]
}