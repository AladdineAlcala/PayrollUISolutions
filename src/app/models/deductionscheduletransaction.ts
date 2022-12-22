

export interface EmpDeductionTransaction{
    prldeductiontrans_Id:number,
    pdsched_Id:number,
    deduction_Id:number,
    emp_Id:string,
    emp_First?:string
    emp_Last?:string,
    deductAmount:number,
    actualDeductedAmount:number,

}


export interface DeductionScheduleTrans{
    pp_Id:number,
    pdsched_Id:number,
    deduction_Id:number,
    description:string,
    empdeductiontrans?:EmpDeductionTransaction[]
}