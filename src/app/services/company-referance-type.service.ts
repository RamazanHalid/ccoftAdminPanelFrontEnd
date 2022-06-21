import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyReferanceTypeService {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  apiUrl = 'https://webapi.cihancopur.com/CompanyReferanceType/'

  companyReferanceTypeFormGroup: FormGroup = this.formBuilder.group({
    COMPANY_REFERANCE_TYPE_ID: "0",
    COMPANY_REFERANCE_TYPE_TR: "",
    COMPANY_REFERANCE_TYPE_EN: "",
    SORT: ""
  });

  initializeFormGroup() {
    this.companyReferanceTypeFormGroup.setValue({
      COMPANY_REFERANCE_TYPE_ID: "0",
      COMPANY_REFERANCE_TYPE_TR: "",
      COMPANY_REFERANCE_TYPE_EN: "",
      SORT: ""
    })
  }

  getCompanyReferanceTypeFormGroup() {
    return this.companyReferanceTypeFormGroup;
  }
  setCompanyReferanceTypeFormGroup(companyReferanceType) {
    this.companyReferanceTypeFormGroup.setValue(companyReferanceType);
  }

  getCompanyReferanceType(id) {
    let newPath = this.apiUrl + "Get?p_iId=" + id;
    return this.httpClient.get<any>(newPath);
  }

  addCompanyReferanceType(companyReferanceType) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, companyReferanceType)
  }

  updateCompanyReferanceType(companyReferanceType) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, companyReferanceType)
  }
}
