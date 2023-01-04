import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PayrollDeductionScheduleComponent } from "./payrolldeductionschedule/payrolldeductionsched-main/payrolldeductionschedule.component";
import { PayrolldeductionscheduleCreateComponent } from "./payrolldeductionschedule/payrolldeductionschedule-create/payrolldeductionschedule-create.component";
import { PayrolldeductionscheduleCreatelistComponent } from "./payrolldeductionschedule/payrolldeductionschedule-createlist/payrolldeductionschedule-createlist.component";
import { PayrollperiodCreateComponent } from "./payrollperiod/payrollperiod-create/payrollperiod-create.component";
import { PayrollperiodComponent } from "./payrollperiod/payrollperiodmain/payrollperiod.component";
import { PayrollsidebarComponent } from "./payrollsidebar/payrollsidebar.component";


const payrollRoutes:Routes=[
    
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
        children:
          [
            {
              path:'add',
              component:PayrolldeductionscheduleCreateComponent
              
            }
          ] 
     
    },
    {
      path: 'payroll/deductionschedule/:_payperiod/add',
      component:PayrolldeductionscheduleCreatelistComponent,
      outlet: 'main'
        
     
    },
    {
      path: 'payroll/deductionschedule/:_payperiod/view',
      component:PayrolldeductionscheduleCreatelistComponent,
      outlet: 'main'
        
     
    },
    
]



@NgModule({
    imports:[RouterModule.forChild(payrollRoutes)],
    exports:[RouterModule]
})

export class PayrollRoutingModule{

}