import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { DeductionService } from 'src/app/services/deduction.service';


@Component({
  selector: 'app-payrolldeductionschedule-createlist',
  templateUrl: './payrolldeductionschedule-createlist.component.html',
  styleUrls: ['./payrolldeductionschedule-createlist.component.css'],
})
export class PayrolldeductionscheduleCreatelistComponent implements OnInit {


  title: string = 'Payroll Deduction Schedule';

  empdeductionlist$!:Observable<DeductionDetails[]>

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private deductionService:DeductionService
    ) {}

  



  ngOnInit(): void {
   this.empdeductionlist$ =this.deductionService.getdeductions$.pipe(map(data=>data.result))
  }


}
