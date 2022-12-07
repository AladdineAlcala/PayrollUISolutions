import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deduction-create',
  templateUrl: './deduction-create.component.html',
  styleUrls: ['./deduction-create.component.css']
})
export class DeductionCreateComponent implements OnInit {
  
  deductiontypes=["Goverment","InHouse"]
  createdeductionForm!: FormGroup;

  ngOnInit(): void {
    
    this.createdeductionForm=new FormGroup({
        'deductiondescription':new FormControl('',Validators.required),
        'deductiontype':new FormControl("InHouse"),
        'deductioncode':new FormControl(null,[Validators.required,Validators.max(5)]),
        'is_default':new FormControl(false)

      
    });
    
  }


  onSaveCreateDeduction(){
      console.log(this.createdeductionForm);
  }

}
