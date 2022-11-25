import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { ResponseDTO } from 'src/app/models/ResponseDTO';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})


export class EmployeeComponent implements OnInit {

  title:string="Employee List";
  
  employee$!:Observable<Employee[]>;

  errorMessage:string="";

  resposeDTO!:ResponseDTO;

  private errorSubject=new BehaviorSubject<string>('');
  
  errorMessageAction$=this.errorSubject.asObservable();

  constructor(private empservice:EmployeeService) {
  
  }


  ngOnInit(): void { 

   this.employee$= this.empservice.getEmployees$
            .pipe(catchError((error)=>{
              this.errorSubject.next(error)
                    return EMPTY;
              }
            )
          );
  }
  

  //Delete Employee
  selectedEmptoDelete(selected:Employee):void{
    console.log(selected);
 }

}
