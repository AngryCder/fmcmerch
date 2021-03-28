import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  s :string;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  send(){
  	const form = new FormData()
  	form.append('file',this.s) 
  	this.http.post("https://fmcw.vercel.app/fileqr ",form,{withCredentials:true}).subscribe((res)=>{
  		console.log(res)
  	})
  	
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
