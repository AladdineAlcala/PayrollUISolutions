import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  empCount:number=0;

  constructor( ) { }

  ngOnInit(): void {
    
/*     this.empService.empCountSubj.subscribe(cnt=>{
      this.empCount=cnt
    }); */
  }
  

  title = 'payrollUI';
  
}
