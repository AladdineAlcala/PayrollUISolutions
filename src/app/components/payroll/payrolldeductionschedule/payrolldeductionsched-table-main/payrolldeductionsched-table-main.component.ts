import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'payrolldeductionsched-table',
  templateUrl: './payrolldeductionsched-table-main.component.html',
  styleUrls: ['./payrolldeductionsched-table-main.component.css']
})
export class PayrolldeductionschedTableComponent {


  constructor(private router:Router, private activatedRoute:ActivatedRoute) {}


  onaddPayrollDeductionSchedule(){

    this.router.navigate(
      [
        '',
        { outlets: { main: ['payroll', 'deductionschedule', 'add'] } },
      ],
      {
        queryParams: { mode: 'add', allow: true },
        relativeTo: this.activatedRoute,
      }
    );
    
  }

}
