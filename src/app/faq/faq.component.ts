import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

interface guide{
	size:string;
	chest:number;
	length:number;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
	data:string;
	displayedColumns: string[] = ['size', 'chest', 'length'];
	sizes:string[]= ["s","m","l","xl","xxl","xxxl"];
	chests:number[]=[36,38,40,42,44,46];
	lengths:number[]=[26,27,28,29,29.5,30];
	dataSource:guide[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public sup: any) { 
  	this.data =  this.sup.name;
  	if(this.data == "table"){
  		for (var i = 0; i < 6; i++) {
  			this.dataSource.push({size:this.sizes[i],chest:this.chests[i],length:this.lengths[i]});
           }
  	}
  }

  ngOnInit(): void {
  }

}
