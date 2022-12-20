import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';

import { PayrollperiodService } from '../services/payrollperiod.service';
import { BaseStore } from './abstractstore';

import {
  PayrollPeriod,
  PayrollPeriodState,
  initialState,
} from '../models/payrollperiod';
import { ResponseDTO } from '../models/ResponseDTO';


@Injectable({
  providedIn: 'root',
})
export class PayrollPeriodStore extends BaseStore<PayrollPeriodState> {
  
  constructor(private payrollperiodService: PayrollperiodService) {
    super(initialState);
  }

  addpayperiod(newPayPeriod: PayrollPeriod):Observable<PayrollPeriod> {
    console.log(`current state ${this.state.payrollperiods}`);

    return this.payrollperiodService.AddPayrollPeriod(newPayPeriod).pipe(
      map((data) =>{
        if(data.isSuccess){

          this.setState((state)=> ({payrollperiods:[...state.payrollperiods,data.result]}))

          return data.result
        }
        
      }),
      
    );
  }


  load_initialState() {
    this.payrollperiodService.getallpayrollperiod().subscribe((data) => {
     // console.log(data);
     this.setState(()=>({ payrollperiods: [...data] }))
    });
  }
}
