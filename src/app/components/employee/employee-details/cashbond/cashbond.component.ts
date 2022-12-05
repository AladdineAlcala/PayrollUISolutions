import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-cashbond',
  templateUrl: './cashbond.component.html',
  styleUrls: ['./cashbond.component.css']
})
export class CashbondComponent implements OnInit {


  @Input() employee_cashbond$!: Observable<Employee>;
  

  ngOnInit(): void {
  
  }


}
