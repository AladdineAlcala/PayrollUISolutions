import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, pipe, Subject, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { ResponseDTO } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';
import { IDeductionEmployee } from '../models/employeedeductionsManipulation';
import { EmpDeductionSettings } from '../models/employeedeductionsettings';


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  
  empCountSubj=new Subject<number>();

  private url:string="";

  constructor( private http:HttpClient)
   {

   }


  getEmployees$=this.getAllEmployee();

  private getAllEmployee():Observable<Employee[]>
  {
    this.url="employees"

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
    this.url="employees";
    return this.http.get<ResponseDTO>(`${environment.base_apiUrl}/${this.url}/`+ id )
          .pipe(
            map((data) => data.result as Employee ),
              catchError(this.handleError)
          );
  }
  
 
   
  /**
   * AddEmployee :Observable<Employee>
 */
  public AddEmployee(employee:Employee):Observable<Employee> {

    console.log(employee);
   return this.addEmployee(employee);
  }

  private addEmployee(emp:Employee){
    this.url="employees"
    return this.http.post<Employee>(`${environment.base_apiUrl}/${this.url}`,emp)
            .pipe(
              map((data) => data
              ),
              catchError(this.handleError)
            );
  }

  /**
   * AddEmployeeDeductionSettings  :Observable<EmpDeductionSettings>
 */
   public EmployeeDeductionCreate(EmployeeDeduction:IDeductionEmployee):Observable<EmpDeductionSettings>
  {
     return this.addEmployeeDeduction(EmployeeDeduction);
  } 

  //https://localhost:7023/api/empdeductionsettings
  private addEmployeeDeduction(newEmployeeDeduction:IDeductionEmployee)
  {

    const url="empdeductionsettings"
     return this.http.post<EmpDeductionSettings>(`${environment.base_apiUrl}/${url}`,newEmployeeDeduction)
                .pipe(
                map(data => data),
                catchError(this.handleError)
              ); 
  }


  //https://localhost:7023/api/empdeductionsettings/GetDeductionByEmp/00001
  public GetEmployeeDeductionsByEmployeeId(empId:string):Observable<EmpDeductionSettings[]>
  {
      return this.GetEmployeeDeductionsByEmployeeId(empId);
  }

  private getEmployeeDeductionsSettings(empId:string){
    this.url="empdeductionsettings";
    return this.http.get<EmpDeductionSettings[]>(`${environment.base_apiUrl}/${this.url}/${empId}`)
  }



 handleError(error:Error){
     return throwError(()=>{
      return 'Unknown Error occured..Please try again';
    });
  }
  

 

}
