import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared/shared.module";
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
import { DeductionscheduleTabEditComponent } from './payrolldeductionschedule/deductionschedule-tab-edit/deductionschedule-tab-edit.component'; 
import { NumberonlyDirective } from "src/app/directives/numberonly.directive";
import { PayrollRoutingModule } from "./payroll-routing.module";



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
        PayrolldeductionscheduleCreateTableComponent,
        DeductionscheduleTabEditComponent,
        NumberonlyDirective,

    
    ],
    imports:[
        CommonModule,
        PayrollRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
    
        TabsModule.forRoot()
    ],
    exports:[
            NumberonlyDirective,
        
    ]
})
export class PayrollModule{

}