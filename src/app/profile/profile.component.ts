import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import { CheckoutService } from 'paytm-blink-checkout-angular';
import { Subscription } from 'rxjs';



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

  private subs: Subscription;

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
  constructor(private _snackBar: MatSnackBar,private http:HttpClient,private storage:LocalStorageService,private readonly  checkoutService: CheckoutService) { }

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
       this.checkoutService.init(
      //config
      {
        data: {
          orderId: "test4",
          amount: "3337",
          token: "e334366c509b4294a285a3b42a5659ea1584106015734",
          tokenType: "TXN_TOKEN"
        },
        merchant: {
          mid: "WrVtoC97652565042711"
        },
        flow: "DEFAULT",
        handler: {
          notifyMerchant: this.notifyMerchantHandler
        }
      },
      //options
      {
        env: 'PROD', // optional, possible values : STAGE, PROD; default : PROD
        openInPopup: true // optional; default : true
      }
    );

    this.subs = this.checkoutService
      .checkoutJsInstance$
      .subscribe(instance=>console.log(instance));
  }

  notifyMerchantHandler = (eventType, data): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
  }
  

}
