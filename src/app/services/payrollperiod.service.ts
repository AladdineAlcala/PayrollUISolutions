import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PayrollPeriod } from '../models/payrollperiod';
import { ResponseDTO } from '../models/ResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class PayrollperiodService {
  url = 'payperiod';

  constructor(
    private http: HttpClient,
  ) {}

  //getallpayrollperiod$=this.getallpayrollperiod();

  public getallpayrollperiod() {
    return this.http.get<ResponseDTO>(
      `${environment.base_apiUrl}/${this.url}/all`
    ).pipe(
      map((data: ResponseDTO) => data.result as PayrollPeriod[]),
      shareReplay(),
      catchError(this.handleError)
    );
  }

  public AddPayrollPeriod(newPayrollPeriod:PayrollPeriod){
    return this.addpayrollperiod(newPayrollPeriod);
  }

  private addpayrollperiod(newPayrollPeriod:PayrollPeriod){
    return this.http.post<ResponseDTO>(
      `${environment.base_apiUrl}/${this.url}`,
      newPayrollPeriod)
    .pipe(
      map((data) => data),
      catchError(this.handleError)
    );
  }

  public removepayrollperiod(id:number){

  }
  


  handleError(error: Error) {
    return throwError(() => {
      return 'Unknown Error occured..Please try again';
    });
  }
}
