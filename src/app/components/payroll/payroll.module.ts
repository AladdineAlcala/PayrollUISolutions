import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/widgets/shared.module";
import { PayrollDeductionScheduleComponent } from "./payrolldeductionschedule/payrolldeductionsched-main/payrolldeductionschedule.component";
import { PayrollperiodCreateComponent } from "./payrollperiod/payrollperiod-create/payrollperiod-create.component";
import { PayrollperiodComponent } from "./payrollperiod/payrollperiodmain/payrollperiod.component";
import { PayrollperiodlistComponent } from "./payrollperiod/payrollperiodlist/payrollperiodlist.component";
import { PayrollsidebarComponent } from "./payrollsidebar/payrollsidebar.component";
import { PayrolldeductionscheduleCreateComponent } from './payrolldeductionschedule/payrolldeductionschedule-create/payrolldeductionschedule-create.component';
import { PayrolldeductionschedTableComponent } from './payrolldeductionschedule/payrolldeductionsched-table-main/payrolldeductionsched-table-main.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {MatCardModule} from '@angular/material/card';
import { PayrolldeductionscheduleCreatelistComponent } from './payrolldeductionschedule/payrolldeductionschedule-createlist/payrolldeductionschedule-createlist.component';
import { DeductionscheduleTabComponent } from './payrolldeductionschedule/deductionschedule-tab-add/deductionschedule-tab-add.component';
import { PayrolldeductionscheduleCreateTableComponent } from './payrolldeductionschedule/payrolldeductionschedule-create-table/payrolldeductionschedule-create-table.component'; 

@NgModule({
    declarations:[
        PayrollsidebarComponent,
        PayrollperiodComponent,
        PayrollperiodlistComponent,
        PayrollperiodCreateComponent,
        PayrollDeductionScheduleComponent,
        PayrolldeductionschedTableComponent,
        PayrolldeductionscheduleCreateComponent,
        PayrolldeductionscheduleCreatelistComponent,
        DeductionscheduleTabComponent,
        PayrolldeductionscheduleCreateTableComponent
    ],
    imports:[
        RouterModule,
        CommonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
        FormsModule,
        TabsModule.forRoot()
    ],
    exports:[
        PayrollsidebarComponent,
        PayrollperiodComponent,
        PayrollperiodlistComponent,
        PayrollperiodCreateComponent,
        PayrollDeductionScheduleComponent,
        PayrolldeductionscheduleCreateComponent
  
    ]
})
export class PayrollModule{

}