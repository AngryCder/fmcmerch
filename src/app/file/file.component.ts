import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  proof:File;

  constructor() { }

  ngOnInit(): void {
  }

  send():void{
  	const form = new FormData()
  	form.append('file',this.proof) 
  	console.log(form)
  }

}
