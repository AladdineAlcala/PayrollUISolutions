import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PayrollPeriod } from 'src/app/models/payrollperiod';
import { PayrollperiodService } from 'src/app/services/payrollperiod.service';

@Component({
  selector: 'app-payrollperiod',
  templateUrl: './payrollperiod.component.html',
  styleUrls: ['./payrollperiod.component.css']
})
export class PayrollperiodComponent implements OnInit {
 
  title:string="Payroll Period List"

  payrolperiods$!:Observable<PayrollPeriod[]>

  heads:any[]=[

    {Head:'Period No', FieldName:'pNo',FieldType:'number' },
    {Head:'Start Date', FieldName:'strtpd_d',FieldType:'date' },
    {Head:'End Date', FieldName:'endpd_d',FieldType:'date' },
    {Head:'Year Period', FieldName:'prlYear',FieldType:'number'},
    {Head:'Action', FieldName:'',FieldType:null}
  ]

  constructor(private payrollperiodService:PayrollperiodService) {
   
    
  }

  ngOnInit(): void {
    
    this.payrolperiods$=this.payrollperiodService.getallPayrollPeriod().pipe(map(result => result))

    //this.payrollperiodService.getallPayrollPeriod().subscribe(data => console.log(data));

  }
  


}
