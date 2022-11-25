import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})

export class EmployeeDetailsComponent implements OnInit  {

constructor(private route:ActivatedRoute) {}

  empId!:string

  ngOnInit(): void {
   const id=this.route.snapshot.paramMap.get('id')!;

    this.empId=id;
  }




}
