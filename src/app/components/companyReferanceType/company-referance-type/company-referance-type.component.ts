import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { CompanyReferanceTypeService } from './../../../services/company-referance-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-referance-type',
  templateUrl: './company-referance-type.component.html',
  styleUrls: ['./company-referance-type.component.css']
})
export class CompanyReferanceTypeComponent implements OnInit {
  operation = "Yeni Referans Tipi Ekle"
  message;
  constructor(private companyReferanceTypeService: CompanyReferanceTypeService,
    private messageService: MessageService,
    private router: Router,private title: Title) { }

  companyReferanceType;
  ngOnInit(): void {
    this.title.setTitle("Referans Tip")
    this.getCompanyReferance()
  }

  getCompanyReferance() {
    this.companyReferanceType = this.companyReferanceTypeService.getCompanyReferanceTypeFormGroup().value
  }

  onSubmit() {
    this.companyReferanceTypeService.setCompanyReferanceTypeFormGroup(this.companyReferanceType);

    if (this.companyReferanceTypeService.getCompanyReferanceTypeFormGroup().valid) {
      let refObj = Object.assign({}, this.companyReferanceTypeService.getCompanyReferanceTypeFormGroup().value)
      if (refObj.COMPANY_REFERANCE_TYPE_ID == 0) {
        this.addCompanyReferanceType(refObj);
      }
      else {
        this.updateCompanyReferanceType(refObj);
      }
    }
  }

  addCompanyReferanceType(companyReferanceType) {
    this.companyReferanceTypeService.addCompanyReferanceType(companyReferanceType).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      } else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          .then()
      }
    })
  }
  updateCompanyReferanceType(companyReferanceType) {
    this.companyReferanceTypeService.updateCompanyReferanceType(companyReferanceType).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      } else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          .then()
      }
    })
  }

  onClose() {
    this.router.navigate(['admin/company-referance-type-list'])
  }
}
