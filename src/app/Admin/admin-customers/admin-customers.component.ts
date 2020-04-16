import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {

  customers: Customer[];
  findedCustomers: Customer[];
  customerId: number;
  customer: Customer;
  customerEmail=new FormControl('', [Validators.required,]);;
  
  constructor(private activeRoute: ActivatedRoute, private customerService: CustomersService) { }

  ngOnInit() {
    this.getCustomer();
  }

  private getCustomer():void{
    let obsOfCustomer: Observable<Customer[]> = this.customerService.getAllCustomers(localStorage.getItem('token'));
  
    obsOfCustomer.subscribe(
      arr => {
      this.customers = arr;
      this.findedCustomers=[];
      for(const c of this.customers){
        this.findedCustomers.push(c);
      }
    }, err => {
      alert(err.error.message);
    });
  }

  deleteCustomer(id: number) {
    var isDelete = confirm("Are you sure that you want to remove customer?");
    if(isDelete){
      this.customerService.deleteCustomer(id, localStorage.getItem("token")).subscribe(msg => {

        this.ngOnInit();
  
      }, err => {
        let obj = JSON.parse(err.error);
        alert(obj.message);
      });
    }

  }

  myFunction(){
    this.customerService.findCustomerByEmail(this.customerEmail,localStorage.getItem("token")).subscribe(arr=>{
      console.log("hhaa");
      
      this.customers = arr;
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    });
  }

  applyFilter(event: any):void {
    let q: string = event.target.value;
    let arr = this.customers.filter((c)=>{
      return c.firstName.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCustomers = arr;
  }
  applyFilterLastName(event: any):void {
    let q: string = event.target.value;
    let arr = this.customers.filter((c)=>{
      return c.lastName.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCustomers = arr;
  }
  applyFilterEmail(event: any):void {
    let q: string = event.target.value;
    let arr = this.customers.filter((c)=>{
      return c.email.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCustomers = arr;
  }

}
