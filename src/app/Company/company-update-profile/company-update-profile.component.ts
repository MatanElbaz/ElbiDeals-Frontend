import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-company-update-profile',
  templateUrl: './company-update-profile.component.html',
  styleUrls: ['./company-update-profile.component.css']
})
export class CompanyUpdateProfileComponent implements OnInit {

  
  public company = new Company();
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
  constructor(private activeRoute: ActivatedRoute,private companyService: CompaniesService, private router: Router) { 
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.companyService.getMyCompany(localStorage.getItem("token")).subscribe(c => {
      this.company = c;
      this.companyName.setValue(c.name);
      this.companyEmail.setValue(c.email);
      this.companyPassword.setValue(c.password); 
      
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
     
    });
  }
  public updateCompany() {
  

    this.company.name = this.companyName.value;
    this.company.email = this.companyEmail.value;
    this.company.password = this.companyPassword.value;
    
    this.companyService.updateCompany(this.company, localStorage.getItem("token")).subscribe(c => {
      this.company = c;
      alert("Your User updated !")
      this.router.navigate(["/home"]);
    }, err => {
      let obj = JSON.parse(err.error);
      alert(obj.message);
    })

  }
}
