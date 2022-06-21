import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompanyReferanceTypeService } from '../../../services/company-referance-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-referance-type-list',
  templateUrl: './company-referance-type-list.component.html',
  styleUrls: ['./company-referance-type-list.component.css']
})
export class CompanyReferanceTypeListComponent implements OnInit {
  companyReferances;
  constructor(private companyReferanceTypeService: CompanyReferanceTypeService, private router: Router,private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle("Referans Tipleri")
    this.getCompanyReferance(0);
  }

  getCompanyReferance(id) {
    this.companyReferanceTypeService.getCompanyReferanceType(id).subscribe(response => {
      this.companyReferances = response.m_cData;
    })
  }
  onCreate() {
    this.companyReferanceTypeService.initializeFormGroup();
    this.router.navigate(['admin/company-referance-type'])
  }
  onEdit(companyReferance) {
    this.companyReferanceTypeService.setCompanyReferanceTypeFormGroup(companyReferance);
    this.router.navigate(['admin/company-referance-type'])

  }
}
