import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {

  apiUrl = "https://webapi.cihancopur.com/Expertise/"
  // Get?p_iId= 
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  expertiseFormGroup: FormGroup = this.formBuilder.group({
    EXPERTISE_ID: 0,
    EXPERTISE_TR: "",
    EXPERTISE_EN: "",
    ICON: "",
    IMAGE: "",
    TEXT_TR: "",
    TEXT_EN: "",
    SORT: 0
  })
  initializeFormGroup() {
    this.expertiseFormGroup.setValue({
      EXPERTISE_ID: 0,
      EXPERTISE_TR: "",
      EXPERTISE_EN: "",
      ICON: "",
      IMAGE: "",
      TEXT_TR: "",
      TEXT_EN: "",
      SORT: 0
    })
  }
  getExpertiseFormGroup(){
    return this.expertiseFormGroup;
  }

  setExpertiseFormGroup(expertise){
    this.expertiseFormGroup.setValue(expertise)
  }

  getExpertise(id) {
    let newPath = this.apiUrl + "Get?p_iId=" + id;
    return this.httpClient.get<any>(newPath);
  }
  addExpertise(expertise) {
    let newPath = this.apiUrl + "Add";
    return this.httpClient.post<any>(newPath, expertise);
  }
  updateExpertise(expertise) {
    let newPath = this.apiUrl + "Update";
    return this.httpClient.post<any>(newPath, expertise);
  }
}
