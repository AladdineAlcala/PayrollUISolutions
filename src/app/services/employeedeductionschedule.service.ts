import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EmpDeductionSettings } from "../models/employeedeductionsettings";
import { PayrollDeductionTransForCreateDTO, PayrollPeriodTransaction, PayrollPeriodTransactionCreateDTO, PeriodDeductionScheduleForCreationDTO } from "../models/payrollperiodtransaction";
import { ResponseDTO } from "../models/ResponseDTO";


@Injectable({providedIn:'root'})
export class EmployeeDeductionsScheduleService {
    
    
    url: string="";
    
    constructor(private http:HttpClient) {
        
    }

  //https://localhost:7023/api/empdeductionsettings/GetDeductionByEmp/00001
  public GetEmployeeDeductionsByEmployeeId(empId:string):Observable<EmpDeductionSettings[]>
  {
      return this.GetEmployeeDeductionsByEmployeeId(empId);
  }

  private getEmployeeDeductionsSettings(empId:string){
    this.url="empdeductionsettings";
    return this.http.get<EmpDeductionSettings[]>(`${environment.base_apiUrl}/${this.url}/GetDeductionByEmp/${empId}`)
  }
  

  public addemployeeDeductionSetting(empDeduction:PayrollDeductionTransForCreateDTO[]):Observable<ResponseDTO>{
    
      this.url="payroll"
      const body = JSON.stringify(empDeduction);
     // console.log(body);
      const header = new HttpHeaders()
      .set('Content-type', 'application/json');
      
     return this.http.post<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/_createPayrollDeductions`,body,{headers:header})
  }

  private getallemployeedeductionschedules(){
        
  }


}