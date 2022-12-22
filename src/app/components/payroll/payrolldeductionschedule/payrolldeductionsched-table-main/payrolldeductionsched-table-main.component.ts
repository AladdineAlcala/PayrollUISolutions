import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PeriodDeductionSchedule } from 'src/app/models/perioddeductionschedule';
import { PayrollDeductionScheduleStore } from 'src/app/store/payrolldeductionschedule.store';

@Component({
  selector: 'payrolldeductionsched-table',
  templateUrl: './payrolldeductionsched-table-main.component.html',
  styleUrls: ['./payrolldeductionsched-table-main.component.css'],
})
export class PayrolldeductionschedTableComponent implements OnInit {
  payrolldeductionschedtranslist$!: Observable<any[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private payrolldeductionscheduleStore: PayrollDeductionScheduleStore
  ) {}

  ngOnInit(): void {
    
    this.payrolldeductionschedtranslist$ = this.payrolldeductionscheduleStore
      .load_payrolldeductionschedtranslist()
      .pipe(
        map((data: PeriodDeductionSchedule[]) =>
          data.map((mapdata) => {
            return {
              payroll_pd: mapdata.pdsched_Id,
              payroll_period: mapdata.pp_id,
              payroll_period_from: mapdata.payrollPeriod.strtpd_d,
              payroll_period_to: mapdata.payrollPeriod.endpd_d,
              payroll_total_deduction:
                mapdata.payrollDeductionTransaction.reduce(
                  (sum, current) => sum + current.deductAmount,
                  0
                ),
              payroll_total_actual: mapdata.payrollDeductionTransaction.reduce(
                (sum, current) => sum + current.actualDeductedAmount,
                0
              ),
            };
          })
        )
      );
  }

  onviewPayrollDeduction(item: any) {
    // const {payroll_period}=item.map((i:any) => i.payroll_period)

    this.router.navigate(
      [
        '',
        {
          outlets: {
            main: [
              'payroll',
              'deductionschedule',
              item[0].payroll_period,
              'view',
            ],
          },
        },
      ],
      {
        queryParams: { mode: 'edit', allow: true },
        relativeTo: this.activatedRoute,
      }
    );
  }

  onaddPayrollDeductionSchedule() {
    this.router.navigate(
      ['', { outlets: { main: ['payroll', 'deductionschedule', 'add'] } }],
      {
        queryParams: { mode: 'add', allow: true },
        relativeTo: this.activatedRoute,
      }
    );
  }
}
