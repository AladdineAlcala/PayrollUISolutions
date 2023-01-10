import { formatNumber } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, combineLatest, delay, map, Observable, Subscription, throwError } from 'rxjs';
import {
  DeductionScheduleTrans,
  EmpDeductionTransaction,
} from 'src/app/models/deductionscheduletransaction';
import { PeriodDeductionScheduleService } from 'src/app/services/perioddeductionscheduled.service';
import { PayrollDeductionScheduleStore } from 'src/app/store/payrolldeductionschedule.store';
import{ toFormControl } from 'src/HelperFunctions/Utilities'


interface ITab {
  heading: string;
  content: EmpDeductionTransaction[];
}

@Component({
  selector: 'app-deductionschedule-tab-edit',
  templateUrl: './deductionschedule-tab-edit.component.html',
  styleUrls: ['./deductionschedule-tab-edit.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeductionscheduleTabEditComponent implements OnInit,OnDestroy {

 title:string="Deduction Schedule List"

  iseditmode: boolean = false;
  tabs: ITab[] = [];
  oldvalue!: number;
  @Input() deductionslist$!: Observable<DeductionScheduleTrans[]>;

  form: FormGroup = new FormGroup({});

  formcontrols!: FormArray;

  control!: FormControl;
  
  pp_Id!:number;
  paramsMode!:string

  sub1:Subscription=new Subscription;
  sub2:Subscription=new Subscription;
  sub3:Subscription=new Subscription;
  

  onClose(){
    //console.log('closer');
    this.router.navigate(['',{ outlets: {side:'payroll',main:null} }]);

  }

  constructor(
    private payrolltransdeductionservice: PeriodDeductionScheduleService,
    private payrolldeductionscheduleStore: PayrollDeductionScheduleStore,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private loadingspinner: NgxSpinnerService,
  ) {

    const comobs = combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]);

    comobs.subscribe(([params, queryParams]) => {
      this.paramsMode = queryParams['mode'];
      this.pp_Id = +params['_payperiod'];
    });

  }

  formInit(datatrans: EmpDeductionTransaction[]) {
    const formgroup = datatrans.map((data) => {
      return new FormGroup({
        actualDeductedAmount: new FormControl(
          formatNumber(Number(data.actualDeductedAmount), 'en-US', '1.0-0'),
          Validators.required
        ),
      });
    });

    this.formcontrols = new FormArray(formgroup);
  }

 get toformControl(){
  return toFormControl;
 }

  getdeduction(index: number, field: string): FormControl {
    return this.formcontrols.at(index).get(field) as FormControl;
  }

  ngOnInit(): void {

    this.deductionslist$=this.payrolldeductionscheduleStore.select(state=>state.deductionscheduletrans);

    this.loadingspinner.show()

    this.sub1=this.deductionslist$
      .pipe(
        map((data) =>
          data.filter((t) =>
            t.empdeductiontrans != undefined
              ? t.empdeductiontrans.length > 0
              : {}
          ), 
         
        ),
        catchError(err => {
          console.log('caught mapping error and rethrowing', err);
          
          return throwError(()=> err);
      }),
      
      )
      .subscribe({
        next: (result) => {
             this.tabs =[]
            result.map(t=>{

              const newTab: ITab = {
                heading: t.description,
                content: t.empdeductiontrans!,
              };

              this.tabs = [...this.tabs, newTab];
    
              this.formInit(t.empdeductiontrans!);
            })


            this.loadingspinner.hide();
        },
        error: (e) => {
          console.error(e)
          this.loadingspinner.hide();
        },
        complete: () => {
          console.log('completed');
         
        }
    });

  }

  saveDSched(index: number, data: any) {
    // update data to database
    this.loadingspinner.show();
    const control = this.getdeduction(index, 'actualDeductedAmount');

    if (control.valid) {

      if (data.actualDeductedAmount != control.value) {

            const now = new Date();
            let empdeductiontransforupdate: any = {
              prldeductiontrans_Id: data.prldeductiontrans_Id,
              pdsched_Id: data.pdsched_Id,
              emp_Id: data.emp_Id,
              deduction_Id: data.deduction_Id,
              deductAmount: data.deductAmount,
              actualDeductedAmount: control.value,

              updatedOn: now,
              lastAccessed: now,
            };

         this.sub2=this.payrolltransdeductionservice
              .updateperioddeductiontransschedule_actualdeduction(
                empdeductiontransforupdate
              )
              .pipe(delay(2000),

              )
              .subscribe({
                next: (result) => {
                  
                  if(result.isSuccess){

                 this.sub3=this.payrolldeductionscheduleStore.load_jointdeductiondetails$(this.pp_Id).subscribe(result=>{

                      setTimeout(() => {
                        const [content] = this.tabs;
                        content.content.map((ele) => (ele.iseditable = false));
                        data.iseditable = false;
                      }, 2000);
                      this.loadingspinner.hide();
                      
                    });
                  
                  }

                  

                },

                error(msg) {
                  console.log('Error Getting Location: ', msg);
                },
                complete: () => console.log('subscription completed'),
              });

      }
    
    
    }
  }

  cancelDSched(data: any) {
    const [content] = this.tabs;
    content.content.map((ele) => (ele.iseditable = false));
    data.iseditable = false;
  }

  editDSched(index: number, data: any) {
    const [content] = this.tabs;
    /*   this.tabs.map(element => {
      element.content.map(t=>t.iseditable=false)
    }); */

    content.content.map((ele) => (ele.iseditable = false));

    data.iseditable = true;

    const control = this.getdeduction(index, 'actualDeductedAmount');
    // console.log(control);
    if (control.invalid) {
      control.setValue(
        formatNumber(Number(data.actualDeductedAmount), 'en-US', '1.0-0')
      );
    }
  }

  ngOnDestroy(): void {
    
    this.sub1 && this.sub1.unsubscribe
    this.sub2 && this.sub2.unsubscribe
    this.sub3 && this.sub3.unsubscribe
  }

  
}
