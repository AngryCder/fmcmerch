import { Component, OnInit,AfterViewInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage'
;

interface tb{
	size:string;
	black:number;
	white:number;
}

@Component({
  selector: 'app-sep',
  templateUrl: './sep.component.html',
  styleUrls: ['./sep.component.scss']
})
export class SepComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['size', 'black', 'white'];

  dataSource:tb[] = [];

  sizes:string[]=["xs","s","m","l","xl","xxl","xxxl"];

  orders:any;

  constructor(private storage:LocalStorageService) {
     this.orders = this.storage.retrieve('orders');
     console.log(this.orders)
    for(let siz of this.sizes){
      this.dataSource.push({size:siz,black:this.orders['dark'][siz],white:this.orders['white'][siz]});
    }
    console.log(this.dataSource);
   }

  ngOnInit(): void {
  }
  ngAfterViewInit():void{

  }
}
