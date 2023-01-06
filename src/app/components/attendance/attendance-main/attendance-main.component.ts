import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayrollPeriod } from 'src/app/models/payrollperiod';
import { PayrollperiodService } from 'src/app/services/payrollperiod.service';

@Component({
  selector: 'app-attendance-main',
  templateUrl: './attendance-main.component.html',
  styleUrls: ['./attendance-main.component.css']
})
export class AttendanceMainComponent implements OnInit {

  displayedColumns:string[]=['pp_id','strtpd_d','endpd_d','prlYear','actions']

  dataSource!:MatTableDataSource<PayrollPeriod>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sub$1:Subscription=new Subscription();

  onSelectLogs(data:any):void{
     // console.log(data)
     this.router.navigate(['',{outlets:{main:['attendance','log-details',data.pp_id]}}], {relativeTo: this.activatedRoute});
  }

  oncreate_dtr():void{
    this.router.navigate(['',{outlets:{main:['attendance','create']}}], {relativeTo: this.activatedRoute});
  }

  onClose():void{
    //console.log('closer');
    this.router.navigate(['',{ outlets: {side:'attendance',main:null} }]);

  }

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private payperiodService:PayrollperiodService
              )
   { 
    this.dataSource=new MatTableDataSource<PayrollPeriod>();
   }

  ngOnInit(): void {

    this.sub$1=this.payperiodService.getallpayrollperiodbyattendancelogs()
               .subscribe(data => {
                this.dataSource.data=data
                this.dataSource.paginator=this.paginator
               })
    
  }

  title:string="DTR Master File"

}
