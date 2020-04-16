import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ActivatedRoute } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-private-coupons',
  templateUrl: './customer-private-coupons.component.html',
  styleUrls: ['./customer-private-coupons.component.css']
})
export class CustomerPrivateCouponsComponent implements OnInit {

  coupons: Coupon[];
  findedCoupons: Coupon[];
  couponId: number;
  coupon: Coupon;

  constructor(private activeRoute: ActivatedRoute,private couponService: CouponsService) { }

  ngOnInit() {
    this.getCoupons();
  }

  private getCoupons(): void{
    let obsOfCoupon: Observable<Coupon[]> =this.couponService.getAllCustomerCoupons(localStorage.getItem("token"));
    
    obsOfCoupon.subscribe(
      arr => {
      this.coupons = arr;
      this.findedCoupons =[];
      for(const c of this.coupons){
        this.findedCoupons.push(c);
      }
    },err =>{
      let obj = JSON.parse(err.error);
      alert(obj.message);
    });
  }


  deleteCoupon(id: number) {
    confirm("Are you sure that you want to remove coupon?");
    this.couponService.deleteCustomerCoupon(id, localStorage.getItem("token")).subscribe(msg=> {
      
      this.ngOnInit();
      
    }, err => {
      let obj = JSON.parse(err.error);
        alert(obj.message);
    });
    
  }

  applyFilter(event: any):void {
    let q: string = event.target.value;
    let arr = this.coupons.filter((c)=>{
      return c.title.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCoupons = arr;
  }

}
