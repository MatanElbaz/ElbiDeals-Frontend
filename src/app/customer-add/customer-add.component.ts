import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomersService } from '../services/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  public customer = new Customer();
  

  public customerFirstName = new FormControl('', [Validators.minLength(2), Validators.maxLength(15), Validators.required, Validators.pattern('^[A-Z].*$')]);
  public customerLastName = new FormControl('', [Validators.minLength(2), Validators.maxLength(15), Validators.required]);
  public customerEmail = new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]));
  public customerPassword = new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(30)]));
  
  registrationForm = new FormGroup(
    {
        firstname: this.customerFirstName,
        lastName: this.customerLastName,
        email: this.customerEmail,
        password: this.customerPassword
    }
);
  constructor(private customerService: CustomersService, private router: Router) { }

  ngOnInit() {
  }
  public addCustomer(): void {
    this.customer.firstName = this.customerFirstName.value;
    this.customer.lastName = this.customerLastName.value;
    this.customer.email = this.customerEmail.value;
    this.customer.password = this.customerPassword.value;
    
    console.log(`
    customer first name:${this.customer.firstName}
    customer last name:${this.customer.lastName}
    customer start date:${this.customer.email}
    customer end date:${this.customer.password}
    `);

    this.customerService.addAdminCustomer(localStorage.getItem("token"), this.customer).subscribe(
      createCustomer => {
        alert("Customer has been successfully Added.")
        this.router.navigate(["/home"]);
      }, err => {
        let obj = JSON.parse(err.error);
        alert(obj.message);
        
      }
    );
  }
}
