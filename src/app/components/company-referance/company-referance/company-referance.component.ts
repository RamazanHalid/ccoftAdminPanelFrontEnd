import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileService } from './../../../services/file.service';
import { MessageService } from './../../../services/message.service';
import { CompanyReferanceTypeService } from './../../../services/company-referance-type.service';
import { CompanyReferanceService } from './../../../services/company-referance.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-referance',
  templateUrl: './company-referance.component.html',
  styleUrls: ['./company-referance.component.css']
})
export class CompanyReferanceComponent implements OnInit {
  companyReferance;
  companyReferanceTypes;
  progress;
  operation = "Referans Ekle"
  constructor(private companyReferanceService: CompanyReferanceService, private companyReferanceTypeService: CompanyReferanceTypeService,
    private messageService: MessageService, private fileService: FileService, private router: Router,private titple : Title) { }

  ngOnInit(): void {
    this.titple.setTitle("Şirket Referansı")
    this.getCompanyReferance();
    this.getCompanyReferanceType(0);
  }

  getCompanyReferance() {
    this.companyReferance = this.companyReferanceService.getCompanyReferanceFormGroup().value;
    if (this.companyReferance.COMPANY_REFERANCE_ID != 0) {
      this.operation = "Referans Güncelleme"
    }
  }

  getCompanyReferanceType(COMPANY_REFERANCE_TYPE_ID) {
    this.companyReferanceTypeService.getCompanyReferanceType(COMPANY_REFERANCE_TYPE_ID).subscribe(response => {
      this.companyReferanceTypes = response.m_cData
      if (this.companyReferance.COMPANY_REFERANCE_ID == 0) {
        this.companyReferance.COMPANY_REFERANCE_TYPE.COMPANY_REFERANCE_TYPE_ID = this.companyReferanceTypes[0].COMPANY_REFERANCE_TYPE_ID
      }
    })
  }

  onSubmit() {
    this.companyReferanceService.setCompanyReferanceFormGroup(this.companyReferance);

    if (this.companyReferanceService.getCompanyReferanceFormGroup().valid) {
      let crObj = this.companyReferanceService.getCompanyReferanceFormGroup().value
      if (crObj.COMPANY_REFERANCE_ID == 0) {
        this.addCompanyReferance(crObj);
      }
      else {
        this.updateCompanyReferance(crObj);

      }
    }
  }

  addCompanyReferance(companyReferance) {
    this.companyReferanceService.addCompanyReferance(companyReferance).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          .then()
      }
    })
  }
  updateCompanyReferance(companyReferance) {
    this.companyReferanceService.updateCompanyReferance(companyReferance).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          .then()
      }
    })
  }
  onClose() {
    this.router.navigate(['admin/company-referance-list'])
  }


  onImageChange(event) {
    const selectedImage = event.target.files[0];
    this.fileService.uploadImage2(selectedImage).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.companyReferance.LOGO = event.body.url;
          break;
        default:
          break;
      }
    });
  }

}
