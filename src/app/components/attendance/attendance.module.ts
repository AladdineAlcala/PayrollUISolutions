import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceMainComponent } from './attendance-main/attendance-main.component';
import { AttendanceSidebarComponent } from './attendance-sidebar/attendance-sidebar.component';
import { AttendanceCreateComponent } from './attendance-create/attendance-create.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AttendanceTableLogsComponent } from './attendance-table-logs/attendance-table-logs.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AttendanceMainComponent,
    AttendanceSidebarComponent,
    AttendanceCreateComponent,
    AttendanceTableLogsComponent,
  ],

  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,

  ]
  ,
  exports:[
    AttendanceMainComponent,
    AttendanceSidebarComponent,
    AttendanceCreateComponent,
  ]
})
export class AttendanceModule { }
