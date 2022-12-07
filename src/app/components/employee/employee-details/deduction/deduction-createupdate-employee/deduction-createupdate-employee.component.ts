import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeductionDataService } from 'src/app/components/deductions/deduction-data.service';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { EmpDeductionSettings } from 'src/app/models/employeedeductions';

@Component({
  selector: 'app-deduction-createupdate-employee',
  templateUrl: './deduction-createupdate-employee.component.html',
  styleUrls: ['./deduction-createupdate-employee.component.css']
})
export class DeductionCreateUpdateEmployeeComponent implements OnInit {

  optmode:string="";
  allow:boolean=true;



  deductions:DeductionDetails[]=[{} as DeductionDetails]

  createemployeedeductionForm!:FormGroup;

  descriptionId:any

  empId:string=" "


  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private deductiondataService:DeductionDataService
  ) 
  {
  
  }
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params:Params)=>{
        this.optmode=params['mode'];
        this.allow=params['allow'];
        //console.log(this.optmode);
    });

    this.createemployeedeductionForm=new FormGroup({
      'deductiondetail':new FormControl('',[Validators.required]),
      'deductionAmount':new FormControl('',[Validators.required,Validators.pattern(/^[.\d]+$/)]),
      'is_Active':new FormControl(true)
    },{
      updateOn:'blur'
    }
    );

    this.deductiondataService.deductionlistdataSource.subscribe(data=>{
     this.deductions=data;
    })

    this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;

  }
  
  onChangeDescription(e:any){
    this.createemployeedeductionForm.get('deductioncode')?.setValue(e.target.value)
  }

  onSubmitDeduction(){

    if(this.optmode==='add')
    {

/*      const employeededuction= {
       // empDeduction_ID:this.createemployeedeductionForm.value.deductiondetail.d_Id,
        emp_ID:this.empId,
        d_Id:this.createemployeedeductionForm.value.deductiondetail.d_Id,
        d_amount:this.createemployeedeductionForm.value.deductionAmount,
        is_Active:this.createemployeedeductionForm.value.
        } */


      console.log(this.createemployeedeductionForm.value);
    }
   

  }

}
