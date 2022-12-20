import { PeriodDeductionSchedule } from "./perioddeductionschedule";

export interface PayrollPeriod{

    pp_id:number;

    strtpd_d:Date;
  
    endpd_d:Date;
  
    prlYear:number;
   
    PeriodDeductionSchedules?:PeriodDeductionSchedule[]
  }

  export interface createPayrollPeriod{
    
    strtpd_d:Date;
  
    endpd_d:Date;
  
    prlYear:number;
  }


  export interface PayrollPeriodState{
    payrollperiods:PayrollPeriod[]
  }

  export const initialState={
    payrollperiods:[]
  }