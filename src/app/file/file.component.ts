import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {HttpClient} from '@angular/common/http';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  s :string;

  b:boolean =true;

  count:number;
  amount : number;
  size:string;
  constructor(	@Inject(MAT_DIALOG_DATA) public sup: any,public dialog:MatDialog,
  	private http:HttpClient,
  	private _snackBar: MatSnackBar) {
    this.count = sup.quantity;
    this.amount = sup.amount;
    this.size = sup.size;
     }

  ngOnInit(): void {
  }

  send(){
  	window.location.href = "https://forms.gle/HZKx7eSyQnQTb8JaA"
  }

  	openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
