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
  	const form = new FormData()
  	form.append('file',this.s) 
  	this.http.post("https://fmcw.vercel.app/fileqr ",form,{withCredentials:true}).subscribe((res)=>{
  		console.log(res)
  		if(res["message"]=="success"){
  			const dialogRef = this.dialog.open(ProfileComponent,{width:'100%',height:"100%",maxWidth:"600px"});
  		}
  		if(res["message"]=="notfound"){
  			this.openSnackBar("please reupload the proof","hide")
}
  	})
  	
  }

  	openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cha(e:any):void{
  	console.log(e)
  	  	const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onload = () => {
        this.s =reader.result as string
    };
  }

}
