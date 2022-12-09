import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter, map, merge, mergeMap, Observable, of, Subscription} from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmpDeductionSettings } from 'src/app/models/employeedeductions';
import { EmployeeDataService } from '../../../../services/employee-data.service';

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit,OnDestroy {
  
  employeedeductionsubs$:Subscription=new Subscription();

  employee_deduction$!: Observable<EmpDeductionSettings[]>;
  
   
  empId:string="";

   constructor(
     private empdataService:EmployeeDataService ,
     private router:Router,
     private activatedRoute:ActivatedRoute) 
     
     {

     }



  ngOnInit(): void {

  // this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

 this.activatedRoute.params.subscribe((params: Params) => {
   // console.log(params['id']);
    this.empId = params['id'];

   });  


      this.employee_deduction$=this.empdataService.setDeductionEmployee();
/*     this.empdataService.setDeductionEmployee().subscribe(data => {
      console.log(data);
    }) */

  }

  onaddDeduction(){
    
    this.router.navigate(['',{outlets:{main:['employees', this.empId,'deduction','add'],}}],{queryParams:{mode:'add', allow:true}, relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
   if(this.employeedeductionsubs$){
      this.employeedeductionsubs$.unsubscribe();
   }
  }

}
