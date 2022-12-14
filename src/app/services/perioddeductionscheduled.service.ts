import { HttpClient, HttpClientJsonpModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, shareReplay, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { EmpDeductionTransaction } from "../models/deductionscheduletransaction";
import { PayrollDeductionTransForCreateDTO } from "../models/perioddeductionscheduleForCreationDTO";
import { ResponseDTO } from "../models/ResponseDTO";

@Injectable({
    providedIn: 'root'
})
export class PeriodDeductionScheduleService{
    
    url:string=" ";
    constructor( private http:HttpClient) {}
    
    public GetDeductionById(payNo:number){
        return this.gedeductionbyId(payNo);
    }

    private gedeductionbyId(payNo:number):Observable<ResponseDTO>
    {
        this.url="perioddeductionschedule"
       
        return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/_getPerodDeductionByPayrollId/${payNo}`)  //https://localhost:7023/api/perioddeductionschedule/_getPerodDeductionByPayrollId/1
        .pipe(
            map((data) => data),
            catchError(this.handleError)
          );
    }

   
    getperioddeductionschedulebypayrollperiod(payNo:number):Observable<ResponseDTO>{

      this.url="payrollperioddeductionTrans"

      //https://localhost:7023/api/payrollperioddeductionTrans/_getPayrollPeriodDeductionTransByPayrollNo/1
      return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/_getPayrollPeriodDeductionTransByPayrollNo/${payNo}`)  //https://localhost:7023/api/perioddeductionschedule/_getPerodDeductionByPayrollId/1
      .pipe(
          map((data) => data),
          catchError(this.handleError)
        );
    }
    
    //https://localhost:7023/api/perioddeductionschedule

    generatepayrolldeductionschedule(payrollperiod:unknown){
      this.url="perioddeductionschedule"

      const body = JSON.stringify(payrollperiod);
      
      const header = new HttpHeaders()
      .set('Content-type', 'application/json');
      
      return this.http.post<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`,body,{headers:header})
    }
    

    /**
     * https://localhost:7023/api/perioddeductionschedule 
     * 
     * */
    getallperioddeductiontransschedule(){
      //console.log('test call from service load');
      this.url="perioddeductionschedule"
   
      return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`)  
      .pipe(
          map((data) => data),
          catchError(this.handleError)
        );

    }



    /**get all data from period deduction schedule 
     * 
     * https://localhost:7023/api/perioddeductionschedule/_getPerodDeductionByPayrollId/1
    */
    getperioddeductiontransactionbypayroll(pp_Id:number){

      this.url="perioddeductionschedule"

      return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/_getPerodDeductionByPayrollId/${pp_Id}`)  
      .pipe(
          map((data) => data),
          shareReplay(),
          catchError(this.handleError)
        );

    }
    

    /** update actual deduction 
     * 
     * https://localhost:7023/api/payrollperioddeductionTrans
     */
    updateperioddeductiontransschedule_actualdeduction(empdeductiontrans:any){

      this.url="payrollperioddeductionTrans"
  
      const body = JSON.stringify(empdeductiontrans);
      
      const header = new HttpHeaders()
      .set('Content-type', 'application/json');

      return this.http.put<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`,body,{headers:header})

    }

    handleError(error: Error) {
        return throwError(() => {
          return 'Unknown Error occured..Please try again';
        });
      }
   
}

