import { ChangeDetectionStrategy, Component, Input,Output, OnInit, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})


export class EmployeeListComponent implements OnInit{

  displayedColumns: string[] = ['emp_ID', 'fname', 'lname','address','contactNo','empStatus','position','getdetails'];

  ngOnInit(): void {

  }

  @Input() employeelist$!:Observable<Employee[]> 

  @Output() selectedEmp=new EventEmitter<Employee>();

/*   editEmp(emp:Employee){
    this.selectedEmp.emit(emp);
  }
 */

  selectEmployee(emp:Employee){
    this.selectedEmp.emit(emp);
  }

}
