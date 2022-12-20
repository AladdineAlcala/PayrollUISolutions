import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { map, Observable, Subscription } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { EmpDeductionSettings } from 'src/app/models/employeedeductionsettings';
import {Sort} from '@angular/material/sort';
import { PayrollDeductionScheduleStore } from 'src/app/store/payrolldeductionschedule.store';
import { PayrollDeductionTrans } from 'src/app/models/payrolldeductionscheduletransactions';
import { ActivatedRoute } from '@angular/router';

interface ITab {
  heading: string;
  content:EmpDeductionSettings[]
}

@Component({
  selector: 'deductionschedule-tab',
  templateUrl: './deductionschedule-tab.component.html',
  styleUrls: ['./deductionschedule-tab.component.css'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeductionscheduleTabComponent implements OnInit, OnDestroy {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  tabs: ITab[] = [];

  deductionsubscription: Subscription = new Subscription();

  @Input() deductionslist$!: Observable<DeductionDetails[]>;

  empdeductionsettings$!:Observable<EmpDeductionSettings[]>

  grids!:Observable<any[]>
   
  payrolldeductionTrans!:PayrollDeductionTrans[]

  empdeductions!: EmpDeductionSettings[];

  value?:string;
  
  iseditmode:boolean=false;
 
  constructor(
    private ref: ChangeDetectorRef,
    private activatedRoute:ActivatedRoute,
    private payrolldeductionscheduleStore:PayrollDeductionScheduleStore
    ) {


    }


/*   ngAfterContentInit(): void {

    const activeTab = this.staticTabs?.tabs.filter((tab)=>tab.active);

    console.log(activeTab);

  } */
  ngOnInit(): void {

   //console.log(this.activatedRoute.snapshot.paramMap.get('period')!);


    this.tabs=[];

   // this.loadingservice.loadingOn();
    this.payrolldeductionscheduleStore.emptydeductionsetting();

   // this.deductionslist$ =this.payrolldeductionscheduleStore.select((state)=>state.employeedeductiondetails)

    console.log('from payroll deduction schedule createlist component');

    this.deductionslist$
    .pipe(map((deductions) => deductions.filter(t=>t.empDeductionSettings.length>0)))
      .subscribe((result) => {
        result.map((t) => {


           this.payrolldeductionscheduleStore.addempdeductionsetting([...(this.empdeductions|| []),...t.empDeductionSettings])

          //this.empdeductions=[...(this.empdeductions|| []),...t.empDeductionSettings]
          // const newpayrolldeductionTrans:PayrollDeductionTrans={pNo:this.payrollperiod,emp_ID:}

          const newTab: ITab = {heading: t.description,content:t.empDeductionSettings};
          //this.tabs.push(newTab);
          // console.log(this.tabs);

          this.tabs = [...this.tabs, newTab];

         // this.payrolldeductionscheduleStore
        //  this.loadingservice.loadingOff();
        });

       //this.ref.detectChanges();

      });



  
  }

  ngOnDestroy(): void {
    this.deductionsubscription && this.deductionsubscription.unsubscribe();
  }

  editDeductionSchedule(item:any){

    console.log(item);
     this.iseditmode=true;
   
  }

  deleteDeductionSchedule(item:any){

  }

  onSelect(data: TabDirective){

    this.value=data.heading;
    console.log(data.heading);
  }

  sortData(sort: Sort){

  }
}
