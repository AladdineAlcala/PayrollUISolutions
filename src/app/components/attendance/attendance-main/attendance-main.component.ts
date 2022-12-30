import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-main',
  templateUrl: './attendance-main.component.html',
  styleUrls: ['./attendance-main.component.css']
})
export class AttendanceMainComponent implements OnInit {

  oncreate_dtr(){
    this.router.navigate(['',{outlets:{main:['attendance','create']}}], {relativeTo: this.activatedRoute});
  }

  onClose(){
    //console.log('closer');
    this.router.navigate(['',{ outlets: {side:'attendance',main:null} }]);

  }

  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
  
    
  }

  ngOnInit(): void {
   // console.log(this.router.url);
  //  console.log(this.router.url.lastIndexOf('attendance',28));
  }

  title:string="DTR Master File"

}
