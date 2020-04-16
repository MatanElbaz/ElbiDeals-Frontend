import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponsService } from '../../services/coupons.service';
import { Coupon } from '../../models/coupon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.css']
})
export class AdminCouponsComponent implements OnInit {
  
  coupons: Coupon[];
  findedCoupons: Coupon[];
  couponId: number;
  coupon: Coupon;
  

  constructor(private activeRoute: ActivatedRoute,private couponService: CouponsService) { }

  ngOnInit() {
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
      alert(err.error.message);
    });
  }


  deleteCoupon(id: number) {
    var isDelete= confirm("Are you sure that you want to remove coupon?");
    if(isDelete){
      this.couponService.deleteCoupon(id, localStorage.getItem("token")).subscribe(msg=> {
      
        this.ngOnInit();
        
      }, err => {
        let obj = JSON.parse(err.error);
          alert(obj.message);
      });
    }
    
  }
  
  public findAdminCouponById(id: number){

    
    
    this.couponService.getAdminCouponById(id).subscribe(c => { 
      this.coupon = c
    
    }, err=>{
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
  applyFilterComapny(event: any):void {
    let q: string = event.target.value;
    let arr = this.coupons.filter((c)=>{
      return c.companyName.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCoupons = arr;
  }
  
}
