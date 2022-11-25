import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  

  constructor(private route:ActivatedRoute) {}
    
  id:string=""

  ngOnInit(): void {
     this.id=this.route.snapshot.paramMap.get('id')!;

     console.log(this.id);
  }

}
