import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  empId!: string;

  ngOnInit(): void {
    //this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.empId = params['id'];
    });
  }

  onEditEmployee() {
    this.router.navigate(['../edit'],{relativeTo:this.activatedRoute})
    //this.router.navigate(['../',this.empId,'edit'], { relativeTo: this.activatedRoute });
  }
}
