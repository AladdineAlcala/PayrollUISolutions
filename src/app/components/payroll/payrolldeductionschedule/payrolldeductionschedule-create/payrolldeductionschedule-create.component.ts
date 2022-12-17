import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, Subject, Subscription } from 'rxjs';
import { PayrollPeriod } from 'src/app/models/payrollperiod';
import { NotificationMessageService } from 'src/app/services/notification.service';
import { PeriodDeductionScheduleService } from 'src/app/services/perioddeductionscheduled.service';
import { PayrollPeriodStore } from 'src/app/store/payrollperiod.store';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-payrolldeductionschedule-create',
  templateUrl: './payrolldeductionschedule-create.component.html',
  styleUrls: ['./payrolldeductionschedule-create.component.css'],
})
export class PayrolldeductionscheduleCreateComponent  implements OnDestroy {
  optmode: string = 'add';

  deductionscheduleForm!: FormGroup;

  errorMessage!:Observable<string>;

  title: string = 'Create Deduction Schedule';

  sub$=new Subscription;

  payrollperiod!:PayrollPeriod;

  constructor(
    private fb: FormBuilder,
    private service: PeriodDeductionScheduleService,
    private notificationservice: NotificationMessageService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private payrollperiodStore:PayrollPeriodStore,
    public datepipe: DatePipe
  ) {
    this.initForm();
    
  }


  initForm() {
    this.deductionscheduleForm = this.fb.group(
      {
        payrollperiod: this.fb.control('', [Validators.required]),
      },
      { updateOn: 'submit' }
    );
  }

  /**submit form */
  onSubmitForm() {
    if (this.optmode == 'add') {
      if (this.deductionscheduleForm.valid) {
        /** call httpservice */

          const pNo = +this.deductionscheduleForm.get('payrollperiod')?.value!;

          this.sub$=this.service.GetDeductionById(pNo).subscribe(result => {

              if (result.isSuccess === true) {
                //if success : display to the view that payroll period has already record in transaction

                //this.subject.next('Payroll Period is already in the list');
                this.notificationservice.set_errorMessage(
                  'Payroll Period is already in the list'
                );
                this.errorMessage = this.notificationservice.errormessage$;
              } else {
                // navigate to deduction list

                //1. get payroll period details and pass it to next page as a parameter

                const payperiod$ = this.payrollperiodStore.select((state) => state.payrollperiods);

                 payperiod$.pipe(map(data=> data.find((p:PayrollPeriod) => p.pNo===pNo))).subscribe(result =>{

                  this.payrollperiod=result!

                 });

                
                        // path: 'payroll/deductionschedule/deductionschedules',
                        this.router.navigate(
                          [
                            '',
                            { outlets: { main: ['payroll', 'deductionschedule', 'deductionschedules'] } },
                          ],
                          {
                            queryParams: {period: this.payrollperiod.pNo,from: this.datepipe.transform(this.payrollperiod.strtpd_d,'yyyy-MM-dd'),to: this.datepipe.transform(this.payrollperiod.endpd_d,'yyyy-MM-dd')},
                            relativeTo: this.activatedRoute,
                          }
                        );
              }
        });
      }
    }
  }

  onReset() {
    this.deductionscheduleForm.reset();
  }


  ngOnDestroy(): void {
    if(this.sub$){
     this.sub$.unsubscribe();
    }
   }

}
