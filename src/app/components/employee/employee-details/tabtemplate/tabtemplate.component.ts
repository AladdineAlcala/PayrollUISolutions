import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'tabtemplate-employee',
  templateUrl: './tabtemplate.component.html',
  styleUrls: ['./tabtemplate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabtemplateComponent implements OnInit {

 @Input() empprofiledata$!:Observable<Employee>;
 
 empId:string;

  empdetailsTab:any={
    menu:{
      PROFILE:'profile',
      WAGERATE:'wage',
      DEDUCTIONS:'deduction',
      CASHBOND:'bond',
      ADVANCES:'advances'
    }
  }

  obj:any;


  //---====================== navtab=========================

  navlinks:any[]=[{}];
  activeLinkIndex:number=-1;

  constructor( private router:Router, private activatedRoute: ActivatedRoute,) {
    this.obj=Object.entries(this.empdetailsTab.menu)
    this.empId=this.activatedRoute.snapshot.paramMap.get('id')!;
    
    this.navlinks=[
      {
        label:'Profile',
        link:'profile',
        index:0
      },
      {
        label:'WAGE RATE',
        link:'wage',
        index:1
      },
      {
        label:'Deduction',
        link:'deduction',
        index:2
      },
      {
        label:'CASHBOND',
        link:'bond',
        index:3
      },
      {
        label:'ADVANCES',
        link:'advances',
        index:4
      }

    ]

  }

  ngOnInit(): void {
    
  //  console.log(this.obj);
/*   this.empprofiledata$.subscribe(data =>{
    console.log('data subscription from tab');
    console.log(data);
   });  */


   /*to get active tab  */
   this.router.events.subscribe((res)=>{
     
      //console.log(this.router.url);

      this.activeLinkIndex=this.navlinks.indexOf(this.navlinks.find(li=> li.link===this.router.url))
   });

  }
}
