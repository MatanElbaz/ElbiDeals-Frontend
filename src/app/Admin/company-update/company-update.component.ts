
import { Company } from 'src/app/models/company';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit {

  public company = new Company;
  public id: any;

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
  constructor(private activeRoute: ActivatedRoute, private companyService: CompaniesService, private router: Router) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.companyService.getCompanyById(this.id,localStorage.getItem('token')).subscribe(c => {
      this.company = c;
      this.companyName.setValue(c.name);
      this.companyEmail.setValue(c.email);
      this.companyPassword.setValue(c.password); 
      
    }, err => {
      this.company = null;
    });

  }

  public updateCompany() {

    this.company.name = this.companyName.value;
    this.company.email = this.companyEmail.value;
    this.company.password = this.companyPassword.value;

    this.companyService.updateAdminCompany(this.id, localStorage.getItem("token"), this.company).subscribe(c => {
      this.company = c;
      alert("Company with id :" + this.id + "updated !")
      this.router.navigate(['home']);
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })

  }

}
