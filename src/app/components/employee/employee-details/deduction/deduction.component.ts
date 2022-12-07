import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter, map, merge, mergeMap, Observable, of} from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { DataService } from '../../employee-data.service';

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit {
  
  employee_deduction$!: Observable<Employee>;
  
  empId:string="";

   constructor(
     private empdataService:DataService ,
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
   



  this.employee_deduction$=this.empdataService.employeeSource.asObservable();
   /*   this.employee_deduction$.subscribe(data =>{
            this.empdeduction=data.empDeductionSettings
          }); */
    
  }

  onaddDeduction(){
    
    this.router.navigate(['',{outlets:{main:['employees', this.empId,'deduction','add'],}}],{queryParams:{mode:'add', allow:true}, relativeTo: this.activatedRoute});
  }

}
