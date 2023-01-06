import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { distinct, map, Observable, tap } from 'rxjs';
import { EmpLogView } from 'src/app/models/logattendanceview';
import { PeriodAttLogs } from 'src/app/models/periodattendancelog';
import { tofullname } from 'src/HelperFunctions/Utilities';



@Component({
  selector: 'loglist-table-emp',
  templateUrl: './loglist-table-emp.component.html',
  styleUrls: ['./loglist-table-emp.component.css'],
})
export class LoglistTableEmpComponent implements OnInit ,OnDestroy,AfterViewInit {
  displayedColumns: string[] = ['em_id', 'fullname', 'position','actions']; 

  dataSource = new MatTableDataSource<EmpLogView>();

  @Input() loglist$!: Observable<PeriodAttLogs[]>;

  @Output() 
  selectedEmpLogEvent=new EventEmitter<EmpLogView>();

  selectedIndex:string="";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() {
  }




  ngOnInit(): void {

    this.loglist$
      .pipe(
        map((response) => {
          const uniqueSet = new Set();

          return response
            .reduce((arr: PeriodAttLogs[], current) => {
              if (!uniqueSet.has(current.emp_Id)) {
                arr.push(current);
                uniqueSet.add(current.emp_Id);
              }
              return arr;
            }, [])
            .map((emp) => ({
              empId: emp.emp_Id,
              fullname: tofullname(emp.employee),
              position: emp.employee.position.positionName,
            }));
        })
      )
      .subscribe((res) =>{
        
        this.dataSource.data=res
       // console.log(res)

      });
  }

  onSelectViewLogs(data:EmpLogView):void{

    //this.dataSource.data.indexOf(data);
   this.selectedIndex=data.empId
   this.selectedEmpLogEvent.emit(data)
  }
 
  
  ngAfterViewInit(): void {
   this.dataSource.paginator=this.paginator;
   this.dataSource.sort=this.sort;
  }

  
  ngOnDestroy(): void {
    
  }




}
