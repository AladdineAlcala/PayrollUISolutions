import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { ResponseDTO } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  
  private url="employees";

  constructor( private http:HttpClient) { }

  getEmployees$=this.getAllEmployee();

  newEmp!:Employee;

  //addEmployee$=this.addEmployee(this.newEmp)

  private getAllEmployee():Observable<Employee[]>
  {
    return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`)
          .pipe(
            map(data=> data.result as Employee[]),
            
            catchError(this.handleError)
          
           );
  }


  public addEmployee(emp:Employee):Observable<Employee>{

    return this.http.post<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`,emp)
            .pipe(
              map(data => data.result[0] as Employee),
              catchError(this.handleError)
            );
  }

  private handleError(error:Error){
     return throwError(()=>{
      return 'Unknown Error occured..Please try again';
    });
  }

  
}
