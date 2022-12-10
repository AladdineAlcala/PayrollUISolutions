import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PayrollPeriod } from '../models/payrollperiod';
import { ResponseDTO } from '../models/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class PayrollperiodService implements OnInit {

  url:string="";

  constructor(private http:HttpClient)
  { }


  ngOnInit(): void {


    throw new Error('Method not implemented.');
  }

  public getallPayrollPeriod():Observable<PayrollPeriod[]>{

    return this.getallpayrollperiod().pipe( map((data:ResponseDTO) => data.result as PayrollPeriod[]),
      catchError(this.handleError)
      ); 
  }


  private getallpayrollperiod(){
      this.url="payperiod";
      return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/all`);
  }

  
 handleError(error:Error){
   return throwError(()=>{
    return 'Unknown Error occured..Please try again';
  });
}

}
