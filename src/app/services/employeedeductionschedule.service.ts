import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EmpDeductionSettings } from "../models/employeedeductionsettings";


@Injectable({providedIn:'root'})
export class EmployeeDeductionsScheduleService {
    
    
    url: string="empdeductionsettings"
    
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


  private getallemployeedeductionschedules(){
        
  }


}