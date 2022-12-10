import { Component, Input, OnInit } from '@angular/core';
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


  ngOnInit(): void {
   this.grids =this.payrollperiodlist$;
  }


  onaddPayrollPeriod(){

  }


  editPayrollPeriod(item:any){
    console.log(item);
  }

  deletePayrollPeriod(item:any){
    console.log(item);
  }

}
