import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeResolver } from './components/employee/employee.resolver';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';

const approutes: Routes = [

  { path:'',component:HomeComponent},
  { path:'home',component:HomeComponent},
  { path:'employees',component:EmployeeComponent ,resolve:
  {
    emp:EmployeeResolver
  }},
  { path:'employees/add',component:EmployeeCreateComponent},
  { path:'employees/details/:id',component:EmployeeDetailsComponent},
  { path:'employees/edit/:id',component:EmployeeEditComponent},
  { path:'deduction',component:DeductionsComponent},
  { path:'**',component:NotfoundpageComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
