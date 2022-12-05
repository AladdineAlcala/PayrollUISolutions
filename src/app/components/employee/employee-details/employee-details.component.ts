import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

import Swal from 'sweetalert2';
import { DataService } from '../data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit,OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empservice:EmployeeService
    ) {}


  empId!: string;

  employee:Employee={} as Employee;

  public _employee$!:Observable<Employee>;

  employeesubscription:Subscription=new Subscription();


  ngOnInit(): void {

    //this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.empId = params['id'];

          this._employee$=this.empservice.GetEmployee(this.empId);

          this.employeesubscription =this._employee$
              .subscribe((data:Employee) => {
                console.log('details from employeedetails ');
                console.log(data);
                this.employee = data;
          
              });
      
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
<<<<<<< HEAD


/*   change_Tab_Event(event:any){
    console.log(event.index);
  } */

  ngOnDestroy(): void {
   if(this.employeesubscription){
    this.employeesubscription.unsubscribe();
   }
  }

=======
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
}
