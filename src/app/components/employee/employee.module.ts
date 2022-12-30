import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { AdvancesComponent } from './employee-details/advances/advances.component';
import { CashbondComponent } from './employee-details/cashbond/cashbond.component';
import { DeductionCreateUpdateEmployeeComponent } from './employee-details/deduction/deduction-createupdate-employee/deduction-createupdate-employee.component';
import { DeductionComponent } from './employee-details/deduction/deduction.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ProfileComponent } from './employee-details/profile/profile.component';
import { TabtemplateComponent } from './employee-details/tabtemplate/tabtemplate.component';
import { WageComponent } from './employee-details/wage/wage.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee-main/employee.component';
import { EmployeesidebarComponent } from './employeesidebar/employeesidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        EmployeesidebarComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeEditComponent,
        TabtemplateComponent,
        WageComponent,
        AdvancesComponent,
        CashbondComponent,
        DeductionComponent,
        ProfileComponent,
        DeductionCreateUpdateEmployeeComponent,
       
    ],
    exports: [
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeEditComponent,
        EmployeesidebarComponent,
        TabtemplateComponent,
        WageComponent,
        AdvancesComponent,
        CashbondComponent,
        DeductionComponent,
        ProfileComponent,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
        
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class EmployeeModule {}
