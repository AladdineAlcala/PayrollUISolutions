

// created 12-18-2022
// this model is is to store to persist data to backend database PayrollDeductionTransDTO class
export interface PayrollDeductionTrans{

    prldeductiontrans_Id?:number;
    pdsched_Id:number,
    emp_Id:string;
    deduction_Id:string;
    deductAmount:number;
    actualDeductedAmount:number
    
}