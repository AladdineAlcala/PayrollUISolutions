import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
<<<<<<< HEAD
import { DeductionMainComponent } from './components/deductions/deduction-main/deduction-main.component';
=======
import { DeductionmainComponent } from './components/deductions/deductionmain/deductionmain.component';
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
import { DeductionsComponent } from './components/deductions/deductions.component';
import { DeductionsidebarComponent } from './components/deductions/deductionsidebar/deductionsidebar.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeResolver } from './components/employee/employee.resolver';
import { EmployeesidebarComponent } from './components/employee/employeesidebar/employeesidebar.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { PayrollsidebarComponent } from './components/payroll/payrollsidebar/payrollsidebar.component';
<<<<<<< HEAD


=======
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8

const approutes: Routes = [

  { path:'',component:HomeComponent},
  { path:'home',component:HomeComponent},
  
  { path:'employees',component:EmployeesidebarComponent,outlet:"side"},

  { path:'employees/all',
          component:EmployeeComponent,
          outlet:"main" ,
          resolve:{
                  empres:EmployeeResolver
                 }
  },
  { path:'employees/add',component:EmployeeCreateComponent,outlet:"main"},
  { path:'employees/:id',component:EmployeeDetailsComponent,outlet:"main"},
  { path:'employees/:id/edit',component:EmployeeEditComponent,outlet:"main"},

  { path:'deductions',component:DeductionsidebarComponent,outlet:"side"},
  { path:'deductions/main',
<<<<<<< HEAD
          component:DeductionMainComponent,
=======
          component:DeductionmainComponent,
>>>>>>> a5aa619761684ad7d6312ee7654f8db949c692d8
          outlet:"main" 
         /*  resolve:{
                  empres:EmployeeResolver
                 } */
  },
  
  { path:'deductions/add',component:DeductionCreateComponent,outlet:"main"},

  { path:'payroll',component:PayrollsidebarComponent},

  { path:'error',component:ErrorpageComponent},
  { path:'**',component:NotfoundpageComponent,pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
