import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
declare var Razorpay:any;
interface details {
	phone:number;
	address1:string;
	address2:string;
	state:string;
	district:string;
	city:string;
	pincode:number;
  rollno:number;
  year:number;
}
interface sizes{
  xs:number;
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
  order:orders;
  detail:details;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	 detail:details = {	phone:null,
	address1:"",
	address2:"",
	state:"",
	district:"",
	city:"",
	pincode:null,
  rollno:null,
  year:null,
};

  user:any = this.storage.retrieve('user');
  constructor(private _snackBar: MatSnackBar,private http:HttpClient,private storage:LocalStorageService) { }

  ngOnInit(): void {
  }

  validate(): void {
    console.log(this.detail)
  	if(this.detail.phone.toString().length != 10){
  		this.openSnackBar("enter valid number","Dance")
  	}
  	if(this.detail.pincode.toString().length != 6){
  		this.openSnackBar("enter valid pincode","Dance")
  	}
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  buy():void{
    this.http.post("https://fmcw.vercel.app/checkout-tshirt",{"order":this.storage.retrieve('orders'),"detail":this.detail}, {withCredentials:true}).subscribe((res:any)=>{
      console.log(res);
    let  a :any = new Razorpay({
    "key": "rzp_test_BZmqKg2c3vGbFd", // Enter the Key ID generated from the Dashboard
    "amount": res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "FMC Weekend  T-Shirts",
    "description": "FMC Weekend  T-Shirts",
    "image": this.user.photoUrl,
    "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
       console.log(response);
    },
        "prefill": {
        "name": this.user.name,
        "email": this.user.email,
        "contact":this.detail.phone
    },    
    "theme": {
        "color": "#7b1fa2"
    }
});

    a.open();

  });
  }
  

}
