import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, Subscription } from 'rxjs';
import { DeductionDetails } from 'src/app/models/deductiondetails';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

import Swal from 'sweetalert2';
import { DeductionDataService } from '../../deductions/deduction-data.service';
import { DataService } from '../employee-data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  errorSubject: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empservice: EmployeeService,
    private empDataService: DataService,
    private deductionDataService: DeductionDataService
  ) {}

  empId!: string;

  employee: Employee = {} as Employee;

  public _employee$!: Observable<Employee>;

  employeesubscription: Subscription = new Subscription();

  deductionlist$!: Observable<any>;

  ngOnInit(): void {
    //this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;

    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params);

      this.empId = params['id'];

      this._employee$ = this.empservice.GetEmployee(this.empId);

      this.employeesubscription = this._employee$.subscribe(
        (data: Employee) => {
          /*    console.log('details from employeedetails ');
                console.log(data);  */
          this.empDataService.employee = data;
          this.empDataService.getCurEmployees();
          this.employee = data;
        }
      );
    });

    //comes from deduction resolver
    this.deductionlist$ = this.activatedRoute.data.pipe(
      map((data: Data) => data?.['deductionresolver']),
      catchError((error) => {
        // console.log(error)
        this.errorSubject.next(error);
        return EMPTY;
      })
    );

    this.deductionlist$.subscribe(result => {
    /*   console.log('deductionlist result from employee details');
      console.log(result); */
      this.deductionDataService.deductionlist = result;
      this.deductionDataService.getCurdeductionlist();
    });


  }

  onEditEmployee() {
    this.router.navigate(
      ['', { outlets: { main: ['employees', this.empId, 'edit'] } }],
      { relativeTo: this.activatedRoute }
    );

    //this.router.navigate(['edit'],{relativeTo:this.activatedRoute})
    //this.router.navigate(['../',this.empId,'edit'], { relativeTo: this.activatedRoute });
  }

  onDelete() {
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

  onCancel() {
    this.router.navigate(['', { outlets: { main: ['employees', 'all'] } }], {
      relativeTo: this.activatedRoute,
    });
    //this.router.navigateByUrl('/employees/all');
  }

  /*   change_Tab_Event(event:any){
    console.log(event.index);
  } */

  ngOnDestroy(): void {
    if (this.employeesubscription) {
      this.employeesubscription.unsubscribe();
    }
  }
}
