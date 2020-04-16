import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomersService } from '../services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  
  private customer :Customer;
  public id:number;

  constructor(private title:Title, private activeRoute: ActivatedRoute, private customerService : CustomersService) {
    this.id = this.activeRoute.snapshot.params['id'];
   }

  ngOnInit() {
    
    this.customerService.getCustomerById(this.id,localStorage.getItem("token")).subscribe(c =>{
      this.customer = c;  
      console.log(this.customer);
      this.title.setTitle("Customer Details");
      },err=>{
        alert(err.error.message);
    });
  }

}
