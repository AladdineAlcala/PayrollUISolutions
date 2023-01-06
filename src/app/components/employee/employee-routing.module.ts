import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GetdeductionResolver } from "../deductions/getdeduction.resolver";
import { EmployeeCreateComponent } from "./employee-create/employee-create.component";
import { AdvancesComponent } from "./employee-details/advances/advances.component";
import { CashbondComponent } from "./employee-details/cashbond/cashbond.component";
import { DeductionCreateUpdateEmployeeComponent } from "./employee-details/deduction/deduction-createupdate-employee/deduction-createupdate-employee.component";
import { DeductionComponent } from "./employee-details/deduction/deduction.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { ProfileComponent } from "./employee-details/profile/profile.component";
import { WageComponent } from "./employee-details/wage/wage.component";
import { EmployeeEditComponent } from "./employee-edit/employee-edit.component";
import { EmployeeComponent } from "./employee-main/employee.component";
import { EmployeesidebarComponent } from "./employeesidebar/employeesidebar.component";
import { GetemployeeResolver } from "./getemployee.resolver";




const employeeRoutes:Routes=[
    
  { path: 'employees', component: EmployeesidebarComponent, outlet: 'side' },

  {
    path: 'employees',
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
  }
]


@NgModule({
    imports:[RouterModule.forChild(employeeRoutes)],
    exports:[RouterModule]
})

export class EmployeeRoutingModule{

}