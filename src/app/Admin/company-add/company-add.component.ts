import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  public company = new Company();

  
  public companyName = new FormControl('', [Validators.minLength(2), Validators.maxLength(15), Validators.required, Validators.pattern('^[A-Z].*$')]);
  public companyEmail = new FormControl('', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]));
  public companyPassword = new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(30)]));

  registrationForm = new FormGroup(
    {
        name: this.companyName,
        email: this.companyEmail,
        password: this.companyPassword
    }
);
  
  constructor(private companyService: CompaniesService, private router: Router) { }

  ngOnInit() {
  }


  
  public addCompany(): void {

    this.company.name = this.companyName.value;
    this.company.email = this.companyEmail.value;
    this.company.password = this.companyPassword.value;
    

    this.companyService.addAdminCompany(localStorage.getItem("token"), this.company).subscribe(
      createCompany => {
        alert("Company has been successfully Added.")
        this.router.navigate(["/home"]);
      }, err => {
        let obj = JSON.parse(err.error);
        alert(obj.message);
        
      }
    );
  }

}
