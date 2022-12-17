import { Component, OnInit } from '@angular/core';
import { PayrollPeriodStore } from './store/payrollperiod.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


 constructor(
  private payperiodstore:PayrollPeriodStore
 ) { }


  ngOnInit(): void {
   this.payperiodstore.load_initialState();
  }


  title = 'payrollUI';
  
}
