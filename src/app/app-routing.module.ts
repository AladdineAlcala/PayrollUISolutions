import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AttendanceMainComponent } from './components/attendance/attendance-main/attendance-main.component';
import { AttendanceSidebarComponent } from './components/attendance/attendance-sidebar/attendance-sidebar.component';

import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { DeductionMainComponent } from './components/deductions/deduction-main/deduction-main.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { GetdeductionResolver } from './components/deductions/getdeduction.resolver';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { AdvancesComponent } from './components/employee/employee-details/advances/advances.component';
import { CashbondComponent } from './components/employee/employee-details/cashbond/cashbond.component';
import { DeductionCreateUpdateEmployeeComponent } from './components/employee/employee-details/deduction/deduction-createupdate-employee/deduction-createupdate-employee.component';
import { DeductionComponent } from './components/employee/employee-details/deduction/deduction.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { ProfileComponent } from './components/employee/employee-details/profile/profile.component';
import { WageComponent } from './components/employee/employee-details/wage/wage.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './components/employee/employee-main/employee.component';
import { EmployeesidebarComponent } from './components/employee/employeesidebar/employeesidebar.component';
import { GetemployeeResolver } from './components/employee/getemployee.resolver';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { PayrollDeductionScheduleComponent } from './components/payroll/payrolldeductionschedule/payrolldeductionschedule.component';
import { PayrollperiodCreateComponent } from './components/payroll/payrollperiod-create/payrollperiod-create.component';
import { PayrollperiodComponent } from './components/payroll/payrollperiod/payrollperiod.component';
import { PayrollsidebarComponent } from './components/payroll/payrollsidebar/payrollsidebar.component';

const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
}

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'employees', component: EmployeesidebarComponent, outlet: 'side' },

  {
    path: 'employees/all',
    component: EmployeeComponent,
    outlet: 'main',
    resolve: {
      employeeresolver: GetemployeeResolver
     
    },
  },
  { path: 'employees/add', component: EmployeeCreateComponent, outlet: 'main' },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    outlet: 'main',
    resolve:
      {
        deductionresolver:GetdeductionResolver
      },      
      children:
      [
        {
          path: 'profile',
          component: ProfileComponent,
        },
        {
          path: 'deduction',
          component: DeductionComponent,children:[
            {
              path:'add',
              component:DeductionCreateUpdateEmployeeComponent,
            }
          ]
        },
        {
          path: 'wage',
          component: WageComponent,
        },
        {
          path: 'bond',
          component: CashbondComponent,
        },
        {
          path: 'advances',
          component: AdvancesComponent,
        },
      ]
  },
  {
    path: 'employees/:id/edit',
    component: EmployeeEditComponent,
    outlet: 'main',
  },
  {
    path:'attendance',
    component:AttendanceSidebarComponent,
    outlet:'side'
  },
  {
    path: 'attendance/main',
    component: AttendanceMainComponent,
    outlet: 'main'
  }
  ,
  { path: 'deductions', component: DeductionsidebarComponent, outlet: 'side' },
  {
    path: 'deductions/main',
    component: DeductionMainComponent,
    outlet: 'main',
    /*  resolve:{
                  empres:EmployeeResolver
                 } */
  },

  {
    path: 'deductions/add',
    component: DeductionCreateComponent,
    outlet: 'main',
  },

  { path: 'payroll', component: PayrollsidebarComponent,outlet:'side' },
  {
    path: 'payroll/period',
        component:PayrollperiodComponent,
        outlet: 'main',
        children:[

          {
            path:'add',
            component:PayrollperiodCreateComponent
            
          }
        ]
   
  },
  {
    path: 'payroll/deductionschedule',
        component:PayrollDeductionScheduleComponent,
        outlet: 'main',
        /* children:[

          {
            path:'add',
            component:PayrollperiodCreateComponent
            
          }
        ] */
   
  },
  { path: 'error', component: ErrorpageComponent,outlet: 'main' },
  { path: '**', component: NotfoundpageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(approutes,routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

