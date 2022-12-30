import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

import Swal from 'sweetalert2';
import { DeductionDataService } from '../../../services/deduction-data.service';
import { EmployeeDataService } from '../../../services/employee-data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {

  readonly title:string="Employee Details";

  errorSubject: any;

  empId!: string;

  employee: Employee = {} as Employee;

  public _employee$!: Observable<Employee>;

  employeesubscription: Subscription = new Subscription();
  employeedeductionsubs:Subscription=new Subscription();

  deductionlist$!: Observable<any>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empservice: EmployeeService,
    private empDataService: EmployeeDataService,
    private deductionDataService: DeductionDataService
  ) {}

  onClose(){
    //console.log('closer');
    this.router.navigate(['',{ outlets: {side:'employees',main:null} }]);

  }


  ngOnInit(): void {
    //this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;

    this.activatedRoute.params.subscribe((params: Params) => {
     //  console.log(params);

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


    this.employeedeductionsubs=this.empDataService.employeeSource.asObservable().pipe(map(data => data.empDeductionSettings)).subscribe(result=>{
     // console.log(result);
      this.empDataService.employeedeductionSource.next(result);

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
