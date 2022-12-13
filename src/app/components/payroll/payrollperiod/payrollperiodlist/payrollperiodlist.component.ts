import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PayrollPeriod } from 'src/app/models/payrollperiod';

@Component({
  selector: 'app-payrollperiodlist',
  templateUrl: './payrollperiodlist.component.html',
  styleUrls: ['./payrollperiodlist.component.css']
})
export class PayrollperiodlistComponent implements OnInit {




  @Input() payrollperiodlist$!:Observable<PayrollPeriod[]>
   
  @Input() heads:any[]=[];
  grids!:Observable<any[]>


  constructor( private router: Router,
    private activatedRoute: ActivatedRoute) 
  { 

  }

  ngOnInit(): void {
   this.grids =this.payrollperiodlist$;
  }


  onaddPayrollPeriod() {
    this.router.navigate(
      [
        '',
        { outlets: { main: ['payroll', 'period', 'add'] } },
      ],
      {
        queryParams: { mode: 'add', allow: true },
        relativeTo: this.activatedRoute,
      }
    );
  
  }

  editPayrollPeriod(item:any){
    console.log(item);
  }

  deletePayrollPeriod(item:any){
    console.log(item);
  }

}
