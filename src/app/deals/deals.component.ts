import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CouponsService } from '../services/coupons.service';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  coupons:Coupon[];
  findedCoupons: Coupon[];
  couponId: number;

  constructor(private title: Title,private couponService: CouponsService) { }

  ngOnInit() {
    this.title.setTitle("Our Deals");
    this.getCoupons();
  }
  private getCoupons(): void{
    
    let obsOfCoupon: Observable<Coupon[]> =this.couponService.getAllCoupons();
    
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

  applyFilter(event: any):void {
    let q: string = event.target.value;
    let arr = this.coupons.filter((c)=>{
      return c.title.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCoupons = arr;
  }

}
