import { Component,OnInit } from '@angular/core';

import { SocialAuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import {LocalStorageService} from 'ngx-webstorage'

import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { SepComponent } from './sep/sep.component';
import { FaqComponent } from './faq/faq.component';
//import { ProfileComponent } from './profile/profile.component';
import { FileComponent } from './file/file.component';

import {HttpClient} from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';


interface sizes{
	s:number;
	m:number;
	l:number;
	xl:number;
	xxl:number;
	xxxl:number;
}

interface orders{
	dark:sizes;
	white:sizes;
}

interface pay{
	user:SocialUser;
	order:orders;
	details;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	user:any;
	loggedIn:boolean;
	dc:number;
	wc:number;
	w:string = "s";
	d:string="s";
	ord:orders;
	cartbadge:number;
	dcb :number = 0;
	wcb : number= 0;
	log_sub:any;
	sizes:string[]=["s","m","l","xl","xxl","xxxl"];

	cartsw :boolean = true;

	constructor(private _snackBar: MatSnackBar,
		private authService: SocialAuthService,
		private storage:LocalStorageService,
		public dialog:MatDialog,
		private http:HttpClient,
		private titleService: Title, 
		private metaService: Meta){
	  this.user = this.storage.retrieve('user');
      this.loggedIn=(this.user != null);

      this.storage.observe("user").subscribe((user)=>{
      this.user = user;
      this.loggedIn=(user != null);
    });
      this.storage.observe("no").subscribe((num:number)=>{
      	this.cartbadge=num;
      })

      if(this.storage.retrieve('orders') == null){
      	      this.ord = {dark:{
	s:0,
	m:0,
	l:0,
	xl:0,
	xxl:0,
	xxxl:0},
	white:{	
	s:0,
	m:0,
	l:0,
	xl:0,
	xxl:0,
	xxxl:0}}
this.storage.store("orders",this.ord);
this.storage.store("no",0);
      }
	}
	ngOnInit():void{
    this.titleService.setTitle("FMC Weekend Merchandise");
    this.metaService.addTags([
      {name: 'keywords', content: 'FMC, Weekend, Merchandise,FMC Weekend,tshirt,T-Shirt,t-shirt,FMC Weekend Merchandise'},
      {name: 'description', content: 'FMC Weekend Merchandise website for selling t-shirts'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'}
    ]);
 this.ord = this.storage.retrieve('orders');
   this.cartbadge = this.storage.retrieve('no');
   	this.total();
 if(!this.loggedIn){
 this.pop_notice();
 }
	}

	pop_up(dia:string):void{
		const dialogRef = this.dialog.open(FaqComponent,{ data: { name: dia },width:'90%',height:"90%",maxWidth:"700px"});
		dialogRef.afterClosed().subscribe(result => {
                     console.log('The T&C was closed');
                     this.dialog.closeAll();
                             });	}

	pop_notice():void{
		this.pop_up("open");
		setTimeout(() => {  this.dialog.closeAll() }, 8000);
	}

	pop_file():void{
		if(this.cartbadge==0){
			this.openSnackBar("Please add something to the cart","hide");
		}
		else{
		this.http.post("https://fmcw.vercel.app/checkout-order",this.storage.retrieve("orders"),{withCredentials:true}).
		subscribe((res:any)=>{
			console.log(res);
			if(res["message"]=="success"){
				const dialogRef = this.dialog.open(FileComponent,{data:{amount:res["amount"],size:res["size"],quantity:res["quantity"]},width:'90%',height:"90%",maxWidth:"700px"});
		dialogRef.afterClosed().subscribe(result => {
                     console.log('file');
                     this.dialog.closeAll();
                             });
			}
			else{
				this.openSnackBar("error","hide");
			}
		})
	}
	}
	login():void{
		 this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		 this.log_sub = this.authService.authState.subscribe((user:any)=>{
		 	this.http.post("https://fmcw.vercel.app/google/login",{"token":user.idToken} ,{withCredentials:true}).subscribe((res)=>{
		 		console.log(res);
		 		if(res["message"] == "ni"){
		 			this.openSnackBar("Please use institue Email ID","hide");
		 		}
		 		else if(res["message"] == "error  in verify"){
		 			this.openSnackBar("Error","hide");
		 		}
		 		else if(res["message"] == "success"){
		 			this.storage.store("user",user);
		 			this.openSnackBar("logged in","hide");
		 		}
		 	});
		 	//this.storage.store("user",user);
		 });

	}

	signOut():void{
		this.authService.signOut();
		this.storage.clear("user");
		this.storage.clear("orders");
		this.storage.clear("no");
		this.log_sub.unsubscribe();
		this.http.get("https://fmcw.vercel.app/google/logout",{withCredentials:true}).subscribe((res)=>{console.log(res)});
		window.location.reload();
	}

	add(color:string){
		if(color=="dark"){
		this.ord[color][this.d]=this.ord[color][this.d]+1;
		this.dcb = this.dcb + 1;
		this.storage.store("orders",this.ord)
		this.storage.store("no",this.dcb+this.wcb);
		//this.wc=this.ord[color][s];
		}
		if(color=="white"){
		this.ord[color][this.w]=this.ord[color][this.w]+1;
		this.wcb = this.wcb + 1;
		this.storage.store("orders",this.ord)
		this.storage.store("no",this.dcb+this.wcb);
		//this.wc=this.ord[color][s];
		}
		console.log(this.w,this.d)
	}
    re(color:string){

		if(color=="dark"){
		if(this.ord[color][this.d]!=0){
			this.dcb = Math.max(this.dcb - 1,0);
			this.storage.store("no",this.dcb+this.wcb);
		}
		this.ord[color][this.d]=Math.max(this.ord[color][this.d]-1,0);
		this.storage.store("orders",this.ord)
				//this.wc=this.ord[color][s];
		}
		if(color=="white"){
		if(this.ord[color][this.w]!=0){
			this.wcb = Math.max(this.wcb - 1,0);
			this.storage.store("no",this.dcb+this.wcb);
		}
		this.ord[color][this.w]=Math.max(this.ord[color][this.d]-1,0);
		this.storage.store("orders",this.ord)
		this.storage.store("no",this.dcb+this.wcb);
		//this.wc=this.ord[color][s];
		}
		console.log(this.w,this.d)
			}


	total():void{
		let temp = 0;
		for(let size of this.sizes){
			this.dcb = this.dcb + this.ord["dark"][size] ;
			this.wcb = this.wcb + this.ord["white"][size]
		}
		this.storage.store("no",this.dcb+this.wcb);
	}
	buy():void{
		if(this.cartbadge==0){
			this.openSnackBar("Please add something to the cart","hide");
		}
		else{
		//const dialogRef = this.dialog.open(ProfileComponent,{width:'100%',height:"100%",maxWidth:"600px"});
            }
	}

	shift(s:string,color:string){
		if(color=="dark"){
		this.d = s;
		//this.wc=this.ord[color][s];
		}
		if(color=="white"){
		this.w = s;
		//this.wc=this.ord[color][s];
		}
		console.log(this.d,this.w)
	}

	openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

	showCart():void{
		if(this.cartsw){
		const dialogRef = this.dialog.open(SepComponent,{width:'90%',height:"90%",maxWidth:"600px"});
		 dialogRef.afterClosed().subscribe(result => {
                     console.log('The cart was closed');
                     this.dialog.closeAll();
                     this.cartsw = !this.cartsw;
                             });
		 this.cartsw = !this.cartsw;
		}
		else{
			this.dialog.closeAll();
			this.cartsw = !this.cartsw;
		}
	}


	parseValue(x:any){
		console.log(x)
	}

  title = 'fmc';
}
