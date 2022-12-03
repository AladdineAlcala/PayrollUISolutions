import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import Swal from 'sweetalert2';

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

    this.router.navigate(['',{outlets:{main:['employees',this.empId,'edit']}}], {relativeTo:this.activatedRoute});

    //this.router.navigate(['edit'],{relativeTo:this.activatedRoute})
    //this.router.navigate(['../',this.empId,'edit'], { relativeTo: this.activatedRoute });
  }

  onDelete(){
    console.log(this.empId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
    
  }

  onCancel(){
    this.router.navigate(['',{outlets:{main:['employees','all']}}],{relativeTo:this.activatedRoute})
    //this.router.navigateByUrl('/employees/all');
  }
}
