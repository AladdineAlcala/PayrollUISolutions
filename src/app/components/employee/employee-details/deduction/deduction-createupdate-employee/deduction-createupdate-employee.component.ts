import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeductionDataService } from 'src/app/services/deduction-data.service';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { EmpDeductionSettings } from 'src/app/models/employeedeductionsettings';
import { IDeductionEmployee } from 'src/app/models/employeedeductionsManipulation';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeDataService } from '../../../../../services/employee-data.service';

@Component({
  selector: 'app-deduction-createupdate-employee',
  templateUrl: './deduction-createupdate-employee.component.html',
  styleUrls: ['./deduction-createupdate-employee.component.css']
})
export class DeductionCreateUpdateEmployeeComponent implements OnInit {

  optmode:string="";
  allow:boolean=true;



  deductions:DeductionDetails[]=[{} as DeductionDetails]
  empdeductions:EmpDeductionSettings[]=[{} as EmpDeductionSettings]

  createemployeedeductionForm!:FormGroup;

  descriptionId:any

  empId:string=" "


  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private deductionDataService:DeductionDataService,
    private employeeService:EmployeeService,
    private employeeDataService:EmployeeDataService
  ) 
  {
  
  }
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params:Params)=>{
        this.optmode=params['mode'];
        this.allow=params['allow'];
      
    });

    this.createemployeedeductionForm=new FormGroup({
      'deductiondetail':new FormControl('',[Validators.required]),
      'deductionAmount':new FormControl('',[Validators.required,Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]),
      'is_Active':new FormControl(true)
    }
    );

    this.deductionDataService.deductionlistdataSource.subscribe(data=>{
     this.deductions=data;
    })

    this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;
     
    /* this.employeeDataService.employeedeductionSource.subscribe(result=> console.log(result))  */

  }
  
  onChangeDescription(e:any){
    this.createemployeedeductionForm.get('deductioncode')?.setValue(e.target.value)
  }

  onSubmitDeduction(){

    if(this.createemployeedeductionForm.valid){
      
          if(this.optmode==='add')
          {
            
            console.log(this.createemployeedeductionForm.status);
        
            const employeededuction={
                emp_Id:this.empId,
                deduction_Id:this.createemployeedeductionForm.value.deductiondetail.deduction_Id,
                d_amount:this.createemployeedeductionForm.value.deductionAmount,
                is_active:this.createemployeedeductionForm.value.is_Active,
              // empDeduction_ID:0
                }
        
              this.employeeService.EmployeeDeductionCreate(employeededuction).subscribe(data=>{

                    const newDeduction=data;

                    this.createemployeedeductionForm.reset();
                    
                    this.employeeDataService.employeedeductionSource.subscribe(data=>{

                      this.empdeductions=[...data,newDeduction];
                     
                   
                    });

                    //console.log(this.empdeductions);
                    this.employeeDataService.employeedeductionSource.next(this.empdeductions);
              })
                
           
            
            

          }

      
    }
    
    

  }

}
