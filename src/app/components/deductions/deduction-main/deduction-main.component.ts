import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { DeductionService } from 'src/app/services/deduction.service';

@Component({
  selector: 'app-deduction-main',
  templateUrl: './deduction-main.component.html',
  styleUrls: ['./deduction-main.component.css']
})
export class DeductionMainComponent implements OnInit {

  title:string="Deductions Master File"

  deductionColumns=["d_id","description","d_type","deductioncode","is_default"];

  deductionList$!:Observable<DeductionDetails[]>



  constructor(private deductionService:DeductionService) {
  
    
  }

  ngOnInit(): void {
    
    this.deductionList$=this.deductionService.getdeductions$.pipe(map(data => data.result))

  }



}
