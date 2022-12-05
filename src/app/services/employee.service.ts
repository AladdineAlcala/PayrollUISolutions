import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { ResponseDTO } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  
  empCountSubj=new Subject<number>();

  private url="employees";

  constructor( private http:HttpClient) { }


  getEmployees$=this.getAllEmployee();

  private getAllEmployee():Observable<Employee[]>
  {
    return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}`)
          .pipe(
            map(data=> data.result as Employee[]),
            
            catchError(this.handleError)
          
           );
  }
  

  public GetEmployee(id:string):Observable<Employee>{
   return this.getEmployee(id);
  }

  private getEmployee(id:string) {
    return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/`+ id )
          .pipe(
            map((data) => data.result as Employee ),
              catchError(this.handleError)
          );
  }
  

   
  /**
   * AddEmployee
 */
  public AddEmployee(employee:Employee):Observable<Employee> {
    return this.addEmployee(employee);
  }

  private addEmployee(emp:Employee){
    return this.http.post<Employee>(`${environment.base_apiUrl}/${this.url}`,emp)
            .pipe(
              map((data) => data
              ),
              catchError(this.handleError)
            );
  }





 handleError(error:Error){
     return throwError(()=>{
      return 'Unknown Error occured..Please try again';
    });
  }
  

 

}
