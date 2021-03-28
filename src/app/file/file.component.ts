import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  proof:File = null;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  send():void{
  	const form = new FormData()
  	form.append('image',this.proof) 
  	console.log(this.proof)
  	this.http.post("https://fmcw.vercel.app/fileqr ",form,{withCredentials:true}).subscribe((res)=>{
  		console.log(res)
  	})
  	
  }

  cha(e:any):void{
  	console.log(e)
  	this.proof = e;
  }

}
