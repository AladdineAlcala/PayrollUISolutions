import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionCreateComponent } from './components/deductions/deduction-create/deduction-create.component';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeResolver } from './components/employee/employee.resolver';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';

const approutes: Routes = [

  { path:'',component:HomeComponent},
  { path:'home',component:HomeComponent},
  { path:'employees',component:EmployeeComponent ,resolve:
  {
    empres:EmployeeResolver
  }},
  { path:'employees/add',component:EmployeeCreateComponent},
  { path:'employees/:id/details',component:EmployeeDetailsComponent},
  { path:'employees/:id/edit',component:EmployeeEditComponent},
  { path:'deduction',component:DeductionsComponent},
  { path:'deduction/add',component:DeductionCreateComponent},
  { path:'error',component:ErrorpageComponent},
  { path:'**',component:NotfoundpageComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
