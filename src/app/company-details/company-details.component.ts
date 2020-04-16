import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../services/companies.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  private company : Company;
  public id:number;

  public constructor(private title:Title, private activeRoute: ActivatedRoute, private companyService : CompaniesService) { 
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
   
    this.companyService.getCompanyById(this.id,localStorage.getItem("token")).subscribe(c =>{
      this.company = c;  
      console.log(this.company);
      this.title.setTitle("Company Details");
      },err=>{
      alert(err.error.message);
    });
  }

}
