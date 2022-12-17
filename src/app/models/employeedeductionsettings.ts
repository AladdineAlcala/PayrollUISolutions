import { DeductionDetails } from "./deductiondetails"
import { Employee } from "./employee"

export class EmpDeductionSettings{

    empDeduction_ID:number=0;
    emp_ID:string=" ";
    d_Id:string= " ";
    d_amount:number =0;
    is_Active:boolean=false;
    
    employee:Employee={ } as Employee;
    deductionDetails:DeductionDetails={ } as DeductionDetails;

    createdOn:Date=new Date();
    updatedOn:Date=new Date();
    lastAccessed:Date=new Date();
}