import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { EmpDeductionSettings } from 'src/app/models/employeedeductionsettings';

interface ITab {
  heading: string;
  content:EmpDeductionSettings[]
}

@Component({
  selector: 'deductionschedule-tab',
  templateUrl: './deductionschedule-tab.component.html',
  styleUrls: ['./deductionschedule-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeductionscheduleTabComponent implements OnInit, OnDestroy {
  tabs: ITab[] = [];

  deductionsubscription: Subscription = new Subscription();

  @Input() deductionslist$!: Observable<DeductionDetails[]>;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.deductionslist$
      .pipe(map((deductions) => deductions))
      .subscribe((result) => {
        result.map((t) => {
          // console.log(t);
          const newTab: ITab = {heading: t.description,content:t.empDeductionSettings };
          //this.tabs.push(newTab);
          // console.log(this.tabs);
          this.tabs = [...this.tabs, newTab];
        });

        this.ref.detectChanges();

      });
  }

  ngOnDestroy(): void {
    this.deductionsubscription && this.deductionsubscription.unsubscribe();
  }
}
