
export interface PayrollPeriod{

    pNo:number;

    strtpd_d:Date;
  
    endpd_d:Date;
  
    prlYear:number;

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