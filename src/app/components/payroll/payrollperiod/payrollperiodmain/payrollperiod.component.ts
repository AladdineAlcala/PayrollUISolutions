import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { PayrollPeriod } from 'src/app/models/payrollperiod';
import { PayrollperiodService } from 'src/app/services/payrollperiod.service';
import { PayrollPeriodStore } from 'src/app/store/payrollperiod.store';

@Component({
  selector: 'app-payrollperiod',
  templateUrl: './payrollperiod.component.html',
  styleUrls: ['./payrollperiod.component.css'],
})
export class PayrollperiodComponent implements OnInit {
  
  title: string = 'Payroll Period List';

  payrolperiods$!: Observable<PayrollPeriod[]>;

  heads: any[] = [
    { Head: 'Period No', FieldName: 'pp_id', FieldType: 'number' },
    { Head: 'Start Date', FieldName: 'strtpd_d', FieldType: 'date' },
    { Head: 'End Date', FieldName: 'endpd_d', FieldType: 'date' },
    { Head: 'Year Period', FieldName: 'prlYear', FieldType: 'number' },
    { Head: 'Action', FieldName: '', FieldType: null },
  ];

  constructor(
    private payrolperiodStore:PayrollPeriodStore
  ) {}

  ngOnInit(): void {
   
  // this.payrolperiodStore.load_initialState()
   this.payrolperiods$= this.payrolperiodStore.state$.pipe(map(state => state.payrollperiods));
   
  // this.payrolperiods$.subscribe(data=> console.log(data));
  }

  
}
