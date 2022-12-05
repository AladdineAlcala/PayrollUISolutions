import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  empSubscription: Subscription = new Subscription();

  @Input() employeeprofile$!: Observable<Employee>;

  profileEmp:Employee={} as Employee;

  ngOnInit(): void {
    this.employeeprofile$.subscribe((res: Employee) => {
     // console.log('data from profile');
      this.profileEmp = res;
    });
  }

  ngOnDestroy(): void {
    if (this.empSubscription) {
      this.empSubscription.unsubscribe();
    }
  }
}
