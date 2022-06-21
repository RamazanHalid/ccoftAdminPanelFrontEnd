import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferanceService {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }
  apiUrl = 'https://webapi.cihancopur.com/Referance/'
  // 
  referaceFormGroup: FormGroup = this.formBuilder.group({
    REFERANCE_ID: 0,
    NAME_TR: "",
    NAME_EN: "",
    TITLE_TR: "",
    TITLE_EN: "",
    INFO: "",
    LINK: "",
    SORT: 0
  })
  initialize() {
    this.referaceFormGroup.setValue({
      REFERANCE_ID: 0,
      NAME_TR: "",
      NAME_EN: "",
      TITLE_TR: "",
      TITLE_EN: "",
      INFO: "",
      LINK: "",
      SORT: 0
    })
  }
  getReferanceFormGroup() {
    return this.referaceFormGroup;
  }
  setReferanceFormGroup(referance) {
    this.referaceFormGroup.setValue(referance);
  }
  getReferance(REFERANCE_ID) {
    let newPath = this.apiUrl + 'Get?p_iId=' + REFERANCE_ID;
    return this.httpClient.get<any>(newPath);
  }
  addReferance(referance) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, referance);
  }
  updateReferance(referance) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, referance);
  }
  deleteReferance(referance) {
    let newPath = this.apiUrl + 'Delete';
    return this.httpClient.post<any>(newPath, referance);
  }
}
