import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  createPayrollPeriod,
  PayrollPeriod,
} from 'src/app/models/payrollperiod';
import { DatePipe } from '@angular/common';
import { PayrollPeriodStore } from 'src/app/store/payrollperiod.store';
import { map, Observable, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-payrollperiod-create',
  templateUrl: './payrollperiod-create.component.html',
  styleUrls: ['./payrollperiod-create.component.css'],
})
export class PayrollperiodCreateComponent implements OnInit, OnDestroy {
  optmode: string = '';
  allow: boolean = false;
  lastId!: number;

  payrollperiodForm!: FormGroup;
  
  payperiod$!:Observable<PayrollPeriod[]>;

  payperiodsubs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private payperiodStore: PayrollPeriodStore
  ) {
    this.initForm();
  }

  initForm() {
    const datet = new Date();

    this.payrollperiodForm = new FormGroup({
      daterange: new FormGroup({
        start: new FormControl<Date | null>(new Date()),
        end: new FormControl<Date | null>(this.addDays(datet, 15)),
      }),
      payrollYear: new FormControl('', [
        Validators.required,
        CustomValidators.isNumbers,
      ]),
    });
  }

  get daterange() {
    return this.payrollperiodForm.get('daterange') as FormGroup;
  }

  getpayrollyear() {
    return this.payrollperiodForm.get('payrollYear') as FormControl;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.optmode = params['mode'];
      this.allow = params['allow'];
    });

       this.payperiodStore.select((state) => state.payrollperiods).pipe(take(1),map(data=>data.length))
       .subscribe((result) => this.lastId = result + 1);

/*     this.payperiodStore
      .getlastid()
      .pipe(map((data) => data))
      .subscribe((result) => (this.lastId = result + 1)); */
  }

  onformSubmit(): void {
    if (this.payrollperiodForm.valid) {
      if (this.optmode === 'add') {
        const newPayPeriod: PayrollPeriod = {
          pp_id: this.lastId,
          strtpd_d: this.payrollperiodForm.get('daterange.start')?.value!,
          endpd_d: this.payrollperiodForm.get('daterange.end')?.value!,
          prlYear: +this.payrollperiodForm.get('payrollYear')?.value!,
        };

      this.payperiodsubs= this.payperiodStore.addpayperiod(newPayPeriod).subscribe();

      this.payrollperiodForm.reset();

      /*   this.router.navigate(
          ['', { outlets: { main: ['payroll', 'period'] } }],
          {
            relativeTo: this.activatedRoute,
          }
        ) */;
      }
    }
  }

  onReset() {
    this.payrollperiodForm.reset();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  ngOnDestroy(): void {
    if (this.payperiodsubs) {
      this.payperiodsubs.unsubscribe();
    }
  }
}

export class CustomValidators {
  static isNumbers(control: AbstractControl) {
    if (!control.value) {
      return null;
    }

    return String(control.value).match(/^[0-9.]+$/)
      ? null
      : { isNumbers: true };
  }
}
