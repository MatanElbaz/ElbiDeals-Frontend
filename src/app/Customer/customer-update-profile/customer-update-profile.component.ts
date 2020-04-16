import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-update-profile',
  templateUrl: './customer-update-profile.component.html',
  styleUrls: ['./customer-update-profile.component.css']
})
export class CustomerUpdateProfileComponent implements OnInit {

  public customer = new Customer();
  public id: any;


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
  constructor(private activeRoute: ActivatedRoute,private customerService: CustomersService, private router: Router) {
    this.id = this.activeRoute.snapshot.params['id'];

   }

  ngOnInit() {
    this.customerService.getMyCustomer(localStorage.getItem("token")).subscribe(c => {
      this.customer = c;
      this.customerFirstName.setValue(c.firstName);
      this.customerLastName.setValue(c.lastName);
      this.customerEmail.setValue(c.email);
      this.customerPassword.setValue(c.password); 
  
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
     
    });
  }

  public updateCustomer() {
  

    this.customer.firstName = this.customerFirstName.value;
    this.customer.lastName = this.customerLastName.value;
    this.customer.email = this.customerEmail.value;
    this.customer.password = this.customerPassword.value;
    
    
    this.customerService.updateCustomer(this.customer, localStorage.getItem("token")).subscribe(c => {
      this.customer = c;
      alert("Your User updated !")
      this.router.navigate(["/home"]);
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })

  }
}
