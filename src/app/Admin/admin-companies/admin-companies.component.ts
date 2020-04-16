import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  companies: Company[];
  findedCompanies: Company[];
  companyId: number;
  company: Company;

  searchCompanies: Company[];
  public myInput:string;

  constructor(private activeRoute: ActivatedRoute, private companyService: CompaniesService) { }

  ngOnInit() {
    this.getCompanies();
  }

  
  private getCompanies(): void{
    let obsOfCoupons: Observable<Company[]> = this.companyService.getAllCompanies(localStorage.getItem('token'));
    obsOfCoupons.subscribe(arr => {
      this.companies = arr;
      this.findedCompanies =[];
      for(const c of this.companies){
        this.findedCompanies.push(c);
      }
    }, err => {
      alert(err.error.message);
      
  });
  }

  deleteCompany(id: number) {
    var isDelete = confirm("Are you sure that you want to remove company?");
    
    if(isDelete){
      this.companyService.deleteCompany(id, localStorage.getItem("token")).subscribe(msg => {

        this.ngOnInit();
  
      }, err => {
        let obj = JSON.parse(err.error);
        alert(obj.message);
      });
    }
  }

  applyFilter(event: any):void {
    let q: string = event.target.value;
    let arr = this.companies.filter((c)=>{
      return c.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCompanies = arr;
  }

  applyFilterEmail(event: any):void {
    let q: string = event.target.value;
    
    let arr = this.companies.filter((c)=>{
      return c.email.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) != -1;
    });
    this.findedCompanies = arr;
  }
  
  
}
