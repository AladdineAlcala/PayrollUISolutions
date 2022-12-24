import { ChangeDetectionStrategy, Component, Input,Output, OnInit, EventEmitter, ContentChild, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { Employee, EmployeeListDisplay } from 'src/app/models/employee';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-list',
  templateUrl:'./employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  //changeDetection:ChangeDetectionStrategy.Default
})


export class EmployeeListComponent implements OnInit,OnDestroy,AfterViewInit {

  employeedatalist:EmployeeListDisplay[]=[];
  displayedColumns: string[] = ['emp_Id', 'fname', 'lname','address','contactNo','empStatus','position','getdetails'];

  empSub:Subscription=new Subscription;

  empdataSource = new MatTableDataSource<EmployeeListDisplay>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @Input() employeelist$!:Observable<Employee[]> 

  @Output() selectedEmp=new EventEmitter<Employee>();

/*   editEmp(emp:Employee){
    this.selectedEmp.emit(emp);
  }
 */

  selectEmployee(emp:Employee){
    this.selectedEmp.emit(emp);
  }


  ngOnInit(): void {

     this.loadingspinner.show();
    this.employeelist$.subscribe({next:(result)=>{
      result.map(emp => {

        const employee={
          emp_Id:emp.emp_Id,
          lname:emp.lname,
          fname:emp.fname,
          empstatus:emp.empStatus,
          contact:emp.contactNo,
          address:emp.address,
          position:emp.position.positionName
        }

        this.employeedatalist.push(employee);

      });

      this.empdataSource.data=this.employeedatalist;

      this.loadingspinner.hide();
    },
    error: (e) => {
      console.error(e)
      this.loadingspinner.hide();
    },
    complete: () => {
     
      console.log('completed');
     
    }
  },
    

    );
  }

  ngAfterViewInit(): void {
      this.empdataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.empSub && this.empSub.unsubscribe();
  }


  constructor(
    private loadingspinner: NgxSpinnerService,
  ) {
    
  }
}
