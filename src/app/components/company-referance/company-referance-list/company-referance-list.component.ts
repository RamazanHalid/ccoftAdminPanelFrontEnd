import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompanyReferanceService } from './../../../services/company-referance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-referance-list',
  templateUrl: './company-referance-list.component.html',
  styleUrls: ['./company-referance-list.component.css']
})
export class CompanyReferanceListComponent implements OnInit {
  companyReferances;
  constructor(private companyReferanceService: CompanyReferanceService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Şirket Referansları")
    this.getCompanyReferance(0, 0, 0);
  }

  getCompanyReferance(COMPANY_REFERANCE_ID, TOP, COMPANY_REFERANCE_TYPE_ID) {
    this.companyReferanceService.getCompanyReferance(COMPANY_REFERANCE_ID, TOP, COMPANY_REFERANCE_TYPE_ID).subscribe(response => {
      this.companyReferances = response.m_cData;
    })
  }
  onCreate() {
    this.companyReferanceService.initializeFormGroup();
    this.router.navigate(['admin/company-referance'])

  }
  onEdit(companyReferance) {
    this.companyReferanceService.setCompanyReferanceFormGroup(companyReferance);
    this.router.navigate(['admin/company-referance'])

  }
}
