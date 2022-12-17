import { Observable } from "rxjs"
import { CashBond } from "./cashbond"
import { EmpDeductionSettings } from "./employeedeductionsettings";
import { Position } from "./position"

export class Employee{

    emp_ID:string="";
    lname:string="";
    middle:string="";
    fname:string="";
    gender:string="";
    dob:Date=new Date();
    address:string="";
    contactNo:string="";
    emailAdd:string="";
    date_Hired:Date=new Date();
    baseRate:number=0;
    baseHour:number=0;
    allowance:number=0;
    empStatus:string="";
    socialsecNum:string="";
    pagibigNum:string="";
    tin:string="";
    is_active:boolean=false;
    maritalstatus:string="";
    salarypaytype:string="";
    bankpayrollaccn:string="";
    bankaccNo:string="";
    pos_Id:string="";

    position:Position={} as Position;
    cashBonds:CashBond[]=[{} as CashBond];
    empDeductionSettings:EmpDeductionSettings[]=[{} as EmpDeductionSettings]

    createdOn:Date=new Date();
    updatedOn:Date=new Date();
    lastAccessed:Date=new Date()
}


export interface EmployeeResolved{
    employee: Observable<Employee[]>;
    error:any;
}