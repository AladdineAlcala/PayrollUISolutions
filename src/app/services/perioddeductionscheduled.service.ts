import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
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
       
        return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/GetByPayrollId/${payNo}`)  //https://localhost:7023/api/perioddeductionschedule/GetByPayrollId/1
        .pipe(
            map((data) => data),
            catchError(this.handleError)
          );
    }


    handleError(error: Error) {
        return throwError(() => {
          return 'Unknown Error occured..Please try again';
        });
      }
  
}