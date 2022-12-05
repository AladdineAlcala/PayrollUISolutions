import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'tabtemplate-employee',
  templateUrl: './tabtemplate.component.html',
  styleUrls: ['./tabtemplate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabtemplateComponent implements OnInit {

 @Input() empprofiledata$!:Observable<Employee>;
  
  empdetailsTab:any={
    menu:{
      PROFILE:'profile',
      WAGERATE:'wage',
      DEDUCTIONS:'deduction',
      CASHBOND:'bond',
      ADVANCES:'advances'
    }
  }

  obj:any;


  constructor() {
    this.obj=Object.entries(this.empdetailsTab.menu)
    
  }

  ngOnInit(): void {
    
    console.log(this.obj);
/*   this.empprofiledata$.subscribe(data =>{
    console.log('data subscription from tab');
    console.log(data);
   });  */
  }
}
