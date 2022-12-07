import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';

@Injectable({
  providedIn: 'root'
})
export class DeductionDataService {

  deductionlist:DeductionDetails[]=[{} as DeductionDetails];

  deductionlistdataSource:BehaviorSubject<DeductionDetails[]>

  constructor() { 
    this.deductionlistdataSource=new BehaviorSubject(this.deductionlist);
  }

  getCurdeductionlist(){
    this.deductionlistdataSource.next(this.deductionlist);
  }
}
