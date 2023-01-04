import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-logdetails',
  templateUrl: './attendance-logdetails.component.html',
  styleUrls: ['./attendance-logdetails.component.css']
})
export class AttendanceLogdetailsComponent {

  title:string="Attendance Log Details"



  constructor(
            private router:Router,
            private activatedRoute:ActivatedRoute

            ) {}
  
  onClose(){
    
    this.router.navigate(['', { outlets: { main: ['attendance'] } }], {
      relativeTo: this.activatedRoute,
    });

  }


}
