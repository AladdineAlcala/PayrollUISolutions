import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {DeductionDetails} from '../models/deductiondetails'
import { Employee } from '../models/employee';
import { ResponseDTO } from '../models/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  private url:string="deductions"



  constructor(private http:HttpClient) 
  { 

  }

  //getdeductions$=this.getAll();

  public getAllDeductionDetails(){
    return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`)
    .pipe(map(data=> data),
    shareReplay()
    ,
    catchError(this.handleError)
    )
  }



 handleError(error:Error){
     return throwError(()=>{
      return 'Unknown Error occured..Please try again';
    });
  }
}
