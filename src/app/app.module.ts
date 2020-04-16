import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './design/header/header.component'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './design/footer/footer.component';
import { HomeComponent } from './design/home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { DealsComponent } from './deals/deals.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminMenuComponent } from './Admin/admin-menu/admin-menu.component';

import { RootComponent } from './components/root/root.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { AdminCouponsComponent } from './Admin/admin-coupons/admin-coupons.component';

import { CouponAddComponent } from './Admin/coupon-add/coupon-add.component';
import { CouponUpdateComponent } from './Admin/coupon-update/coupon-update.component';
import { AdminCompaniesComponent } from './Admin/admin-companies/admin-companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyUpdateComponent } from './Admin/company-update/company-update.component';

import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CompanyAddComponent } from './Admin/company-add/company-add.component';
import { AdminCustomersComponent } from './Admin/admin-customers/admin-customers.component';
import { CompanyMenuComponent } from './Company/company-menu/company-menu.component';
import { CompanyCouponsComponent } from './company/company-coupons/company-coupons.component';
import { CompanyCouponUpdateComponent } from './company/company-coupon-update/company-coupon-update.component';
import { CompanyCouponAddComponent } from './company/company-coupon-add/company-coupon-add.component';
import { CompanyUpdateProfileComponent } from './Company/company-update-profile/company-update-profile.component';
import { CustomerUpdateProfileComponent } from './customer/customer-update-profile/customer-update-profile.component';
import { CustomerMenuComponent } from './Customer/customer-menu/customer-menu.component';
import { PurchaseCouponComponent } from './customer/purchase-coupon/purchase-coupon.component';
import { CustomerPrivateCouponsComponent } from './customer/customer-private-coupons/customer-private-coupons.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    ContactComponent,
    DealsComponent,
    LayoutComponent,
    MenuComponent,
    NotFoundComponent,
    CouponDetailsComponent,
    AdminMenuComponent,
    CompanyMenuComponent,
    CustomerMenuComponent,
    RootComponent,
    AdminCouponsComponent,
    CouponUpdateComponent,
    CouponAddComponent,
    AdminCompaniesComponent,
    CompanyDetailsComponent,
    CompanyUpdateComponent,
    CompanyAddComponent,
    AdminCustomersComponent,
    CustomerDetailsComponent,
    CustomerAddComponent,
    CustomerUpdateComponent,
    CompanyCouponsComponent,
    CompanyCouponUpdateComponent,
    CompanyCouponAddComponent,
    CompanyUpdateProfileComponent,
    CustomerUpdateProfileComponent,
    PurchaseCouponComponent,
    CustomerPrivateCouponsComponent,
    UpdateAdminComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DealsComponent],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
