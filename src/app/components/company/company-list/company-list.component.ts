import { Router } from '@angular/router';
import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies;
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.getCompanies(0);
  }

  getCompanies(COMPANY_ID) {
    this.companyService.getCompany(COMPANY_ID).subscribe(response => {
      this.companies = response.m_cData;
    })
  }

  onCreate() {
    this.companyService.initializeCompanyFormGroup()
    this.router.navigate(['admin/company/0'])
  }
  onEdit(company) {
    this.companyService.setCompanyFormGroup(company);
    this.router.navigate(['admin/company/' + company.COMPANY_ID])
  }

}
