

export interface  PayrollDeductionTransForCreateDTO{

   pdsched_Id:number;

   emp_Id:string;

   deduction_Id:string;

   deductAmount:number;

   actualDeductedAmount:number
   
}


export interface PeriodDeductionScheduleForCreationDTO{
   pp_id:number
}



export interface PayrollPeriodTransactionCreateDTO
{

   perioddeductionscheduletrans?:PeriodDeductionScheduleForCreationDTO
   payrolldeductiontrans?:PayrollDeductionTransForCreateDTO[]

}


