import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payrolldeductionschedule',
  templateUrl: './payrolldeductionschedule.component.html',
  styleUrls: ['./payrolldeductionschedule.component.css']
})
export class PayrollDeductionScheduleComponent {

    title:string=" Payroll Deductions Schedule"


    constructor(private router:Router) {
    
      
    }

    onClose(){
      //console.log('closer');
      this.router.navigate(['',{ outlets: {side:'payroll',main:null} }]);
  
    }
}
