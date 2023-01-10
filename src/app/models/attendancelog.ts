
import { Timestamp } from "rxjs"
import { Employee } from "./employee"
import { PayrollPeriod } from "./payrollperiod"



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

export interface FinalAttLogs{

    indexNo:number,
    emp_Id:string,
    pp_id?:number,
    date_in:Date,
    time_inAM?:string,
    time_outAM?:string,
    date_out?:Date,
    time_inPM?:string,
    time_outPM?:string
    shiftcode?:number
    
    employee?:Employee
    payrollPeriod?:PayrollPeriod

}


export interface FinalAttLogsCreate{

   
    emp_Id:string,
    pp_id?:number,
    date_in:string,
    time_inAM?:string,
    time_outAM?:string,
    date_out?:string,
    time_inPM?:string,
    time_outPM?:string
    shiftcode?:number


}

export interface FinalAttLogsUpdate{
    
    indexNo:number,
    emp_Id:string,
    pp_id?:number,
    date_in:string,
    time_inAM?:string,
    time_outAM?:string,
    date_out?:string,
    time_inPM?:string,
    time_outPM?:string
    shiftcode?:number


}


export interface AttendanceLogCreate{
    emp_Id:string,
    verificationMode:number,
    datetimeVerify:Date,
    inoutMode:number,
    pp_id:number;
}


export interface ModifyLogs{
    indexNo:number,
    field:string,
    currentvalue:string
    prevValue:string
}


export const dwInOutMode= {
    0:"Check-In",
    1:"Check-Out",
    2:"Break-In",
    3:"Break-Out",
    4:"OT-In",
    5:"OT-Out",
}