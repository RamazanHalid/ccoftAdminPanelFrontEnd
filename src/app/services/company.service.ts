import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl = "https://webapi.cihancopur.com/Company/";

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private datePipe: DatePipe) {
  }

  companyFormGroup: FormGroup = this.formBuilder.group({
    COMPANY_ID: 0,
    NAME_TR: "",
    NAME_EN: "",
    TEXT_TR: "",
    TEXT_EN: "",
    START_DATE: new Date(),
    END_DATE: new Date(),
    ON_GOING: true,
    WEB_SITE: "",
    LOGO: "",
    LINKEDIN: "",
    INSTAGRAM: "",
    FACEBOOK: "",
    TWITTER: "",
    INFO_TR: "",
    INFO_EN: "",
    TOTAL_DAY: 0,
    DATE: ""
  })
  initializeCompanyFormGroup() {
    this.companyFormGroup.setValue(
      {
        COMPANY_ID: 0,
        NAME_TR: "",
        NAME_EN: "",
        TEXT_TR: "",
        TEXT_EN: "",
        START_DATE: new Date(),
        END_DATE: new Date(),
        ON_GOING: true,
        WEB_SITE: "",
        LOGO: "",
        LINKEDIN: "",
        INSTAGRAM: "",
        FACEBOOK: "",
        TWITTER: "",
        INFO_TR: "",
        INFO_EN: "",
        TOTAL_DAY: 0,
        DATE: ""
      }
    );
  }

  getCompanyFormGroup() {
    return this.companyFormGroup;
  }


  setCompanyFormGroup(company) {
    this.companyFormGroup.setValue(company);
  }
  getCompany(COMPANY_ID) {
    let newPath = this.apiUrl + 'Get?p_iId=' + COMPANY_ID;
    return this.httpClient.get<any>(newPath);
  }
  addCompany(company) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, company);
  }
  updateCompany(company) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, company);
  }
}
