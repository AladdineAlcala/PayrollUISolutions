

export interface  PayrollDeductionTransForCreateDTO{
   pdsched_Id?:number,

   emp_Id:string;

   deduction_Id:string;

   deductAmount:number;

   actualDeductedAmount:number
   
}


export interface PeriodDeductionScheduleForCreationDTO{
   pdsched_Id?:number,
   pp_id:number
}




export interface PayrollPeriodTransactionCreateDTO
{

   perioddeduction_dto?:PeriodDeductionScheduleForCreationDTO
   payrolDeductionTransList?:PayrollDeductionTransForCreateDTO[]

}


export interface PayrollPeriodTransaction
{

   perioddeductionscheduletrans?:PeriodDeductionScheduleForCreationDTO
   payrolldeductiontrans?:PayrollDeductionTransForCreateDTO[]

}


