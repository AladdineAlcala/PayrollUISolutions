import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { EmpDeductionSettings } from 'src/app/models/employeedeductionsettings';
import { PayrollDeductionScheduleStore } from 'src/app/store/payrolldeductionschedule.store';
import { PayrollDeductionTrans } from 'src/app/models/payrolldeductionscheduletransactions';
import { ActivatedRoute } from '@angular/router';

interface ITab {
  heading: string;
  content: EmpDeductionSettings[];
}

@Component({
  selector: 'deductionschedule-tab',
  templateUrl: './deductionschedule-tab-add.component.html',
  styleUrls: ['./deductionschedule-tab-add.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeductionscheduleTabComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  tabs: ITab[] = [];

  deductionsubscription: Subscription = new Subscription();

  @Input() deductionslist$!: Observable<DeductionDetails[]>;

  empdeductionsettings$!: Observable<EmpDeductionSettings[]>;

  grids!: Observable<any[]>;

  payrolldeductionTrans!: PayrollDeductionTrans[];

  empdeductions!: EmpDeductionSettings[];

  value?: string;

  iseditmode: boolean = false;

  paramsMode: string = '';

  pp_Id!: number;

  constructor(
    private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private payrolldeductionscheduleStore: PayrollDeductionScheduleStore
  ) {
    this.tabs = [];

    const comobs = combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]);

    comobs.subscribe(([params, queryParams]) => {
      this.paramsMode = queryParams['mode'];
      this.pp_Id = +params['_payperiod'];
    });
  }

  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.paramMap.get('period')!);

    this.payrolldeductionscheduleStore.emptydeductionsetting();

    if (this.paramsMode === 'edit')
     {

     


    }
     else {

      this.deductionslist$
      .pipe(
        map((deductions) =>
          deductions.filter((t) => t.empDeductionSettings.length > 0)
        )
      )
      .subscribe((result) => {
        
        result.map((t) => {

          this.payrolldeductionscheduleStore.addempdeductionsetting([
            ...(this.empdeductions || []),
            ...t.empDeductionSettings,
          ]);

          const newTab: ITab = {
            heading: t.description,
            content: t.empDeductionSettings,
          };
      
    
          this.tabs = [...this.tabs, newTab];

        })

        
      })
        
    }
  }

  onSelect(data: TabDirective) {
    this.value = data.heading;
    console.log(data.heading);
  }
  
  editDeductionSchedule(item: any) {
    console.log(item);
    this.iseditmode = true;
  }

}
