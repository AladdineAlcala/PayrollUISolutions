import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'payrolldeductionschedule-create-table',
  templateUrl: './payrolldeductionschedule-create-table.component.html',
  styleUrls: ['./payrolldeductionschedule-create-table.component.css']
})
export class PayrolldeductionscheduleCreateTableComponent implements OnInit {

  

  grids!:Observable<any[]>
   
  
  heads: any[] = [
    { Head: 'Period No', FieldName: 'pNo', FieldType: 'number' },
    { Head: 'Start Date', FieldName: 'strtpd_d', FieldType: 'date' },
    { Head: 'End Date', FieldName: 'endpd_d', FieldType: 'date' },
    { Head: 'Year Period', FieldName: 'prlYear', FieldType: 'number' },
    { Head: 'Action', FieldName: '', FieldType: null },
  ];

  constructor() {

    
    
  }
  ngOnInit(): void {

  }
  
  editDeductionSchedule(item:any){

  }

  deleteDeductionSchedule(item:any){

  }
}
