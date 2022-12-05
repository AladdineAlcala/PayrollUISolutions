import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmpDeductionSettings } from 'src/app/models/employeedeductions';

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit {
  
  @Input() employee_deduction$!: Observable<Employee>;
  
  empdeduction:EmpDeductionSettings[]=[{} as EmpDeductionSettings];


  ngOnInit(): void {
    
  }


}
