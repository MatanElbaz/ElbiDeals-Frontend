import { Component, OnInit } from '@angular/core';
import { CouponsService } from '../../services/coupons.service';
import { Coupon } from '../../models/coupon';
import { ActivatedRoute } from '@angular/router';
import { CouponDetailsComponent } from '../../coupon-details/coupon-details.component';
import { Title } from '@angular/platform-browser';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  

  constructor(private modeService:ModeService) { }

  ngOnInit() {
    
    
  }

  
  

  
  

}
