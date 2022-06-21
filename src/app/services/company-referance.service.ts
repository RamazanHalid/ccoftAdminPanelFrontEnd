import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyReferanceService {
  apiUrl = 'https://webapi.cihancopur.com/CompanyReferance/'
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  companyReferanceFormGroup: FormGroup = this.formBuilder.group({
    COMPANY_REFERANCE_ID: 0,
    COMPANY_REFERANCE_TYPE: {
      COMPANY_REFERANCE_TYPE_ID: 0,
      COMPANY_REFERANCE_TYPE_TR: "",
      COMPANY_REFERANCE_TYPE_EN: "",
      SORT: 0
    },
    NAME_TR: "",
    NAME_EN: "",
    LINK: "",
    LOGO: "",
    COMPANY_SORT: 0
  });

  initializeFormGroup() {
    this.companyReferanceFormGroup.setValue({
      COMPANY_REFERANCE_ID: 0,
      COMPANY_REFERANCE_TYPE: {
        COMPANY_REFERANCE_TYPE_ID: 0,
        COMPANY_REFERANCE_TYPE_TR: "",
        COMPANY_REFERANCE_TYPE_EN: "",
        SORT: 0
      },
      NAME_TR: "",
      NAME_EN: "",
      LINK: "",
      LOGO: "",
      COMPANY_SORT: 0
    })
  }

  getCompanyReferanceFormGroup() {
    return this.companyReferanceFormGroup;
  }
  setCompanyReferanceFormGroup(companyReferance) {
    this.companyReferanceFormGroup.setValue(companyReferance)
  }
  getCompanyReferance(COMPANY_REFERANCE_ID, TOP, COMPANY_REFERANCE_TYPE_ID) {
    let newPath = this.apiUrl + 'Get?p_iId=' + COMPANY_REFERANCE_ID + '&p_iTopCount=' + TOP + '&p_iCompanyReferanceTypeId=' + COMPANY_REFERANCE_TYPE_ID
    return this.httpClient.get<any>(newPath);
  }
  addCompanyReferance(companyReferance) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, companyReferance);
  }
  updateCompanyReferance(companyReferance) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, companyReferance);
  }

}
