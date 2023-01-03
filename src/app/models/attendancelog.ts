import { Type } from "@angular/core"
import { Employee } from "./employee"



export interface AttendanceLogFetch{
    lCount:number,
    enrollNumber:string,
    verifyMode:number,
    inOutMode:number
    dateTimeVerify:Date,
    workcode:number

}


export interface AttendanceLog{

    indexNo:number,
    EmpID:string,
    verificationMode:number,
    inoutMode:number,
    datetimeVerify:Date,
    workcode:number

    Employee:Employee
    
}


export interface AttendanceLogCreate{
    emp_Id:string,
    verificationMode:number,
    datetimeVerify:Date,
    inoutMode:number,
    pp_id:number;
}

export const dwInOutMode= {
    0:"Check-In",
    1:"Check-Out",
    2:"Break-In",
    3:"Break-Out",
    4:"OT-In",
    5:"OT-Out",
}