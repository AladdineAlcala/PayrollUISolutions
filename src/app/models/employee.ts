import { Position } from "./position"

export class Employee{

    emp_ID:string=""
    lname:string=""
    middle:string=""
    fname:string=""
    gender:string=""
    dob:Date=new Date()
    address:string=""
    contactNo:string=""
    emailAdd:string=""
    date_Hired:Date=new Date()
    baseRate!:number
    baseHour!:number
    allowance!:number
    empStatus:string=""
    socialsecNum:string=""
    pagibigNum:string=""
    tin:string=""
    is_active:boolean=false
    maritalstatus:string=""
    salarypaytype:string=""
    bankpayrollaccn:string=""
    bankaccNo:string=""
    pos_Id:string=""
    position:Position=new Position()
   
}