import { ChangeDetectionStrategy, Component, Input,Output, OnInit, EventEmitter, ContentChild, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Observable, Subscription } from 'rxjs';
import { Employee, EmployeeListDisplay } from 'src/app/models/employee';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeStore } from 'src/app/store/employee.store';

@Component({
  selector: 'employeelist',
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
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input() employeelist$!:Observable<Employee[]> 

   searchval!:string

  @Output() selectedEmp=new EventEmitter<Employee>();



  selectEmployee(emp:Employee){
    this.selectedEmp.emit(emp);
  }

  async doSearch(event:any){
   // this.searchval= await event.target.value + '' ; 
    this.empdataSource.filter= await event.target.value + ''.trim().toLocaleLowerCase(); 
    
  }


  ngOnInit(): void {
    
    this.employeelist$.subscribe({next:(result)=>{

     // this.empstore.initemployeeState(result)

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

     // this.loadingspinner.hide();
    },
    error: (e) => {
      console.error(e)
     // this.loadingspinner.hide();
    },
    complete: () => {
     
      console.log('completed');
     
    }
  },
    

    );
  }

  ngAfterViewInit(): void {

      this.empdataSource.sort=this.sort;

      this.empdataSource.paginator = this.paginator;
    
      
  }

  ngOnDestroy(): void {
    this.empSub && this.empSub.unsubscribe();
  }




  constructor(
    private loadingspinner: NgxSpinnerService,
    private empstore:EmployeeStore
  ) {
    
  }
}
