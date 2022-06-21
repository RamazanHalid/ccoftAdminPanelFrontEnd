import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }
  apiUrl = "https://webapi.cihancopur.com/Skill/"
  // Get?p_iId=0&p_iTechnical=-1
  skillFormGroup: FormGroup = this.formBuilder.group({
    SKILL_ID: 0,
    IS_TECHNICAL: true,
    TEXT_TR: "",
    TEXT_EN: "",
    POINT: 0,
    SORT: 0
  })
  initializeFormGroup() {
    this.skillFormGroup.setValue({
      SKILL_ID: 0,
      IS_TECHNICAL: true,
      TEXT_TR: "",
      TEXT_EN: "",
      POINT: 0,
      SORT: 0
    })
  }
  getSkillFormGroup() {
    return this.skillFormGroup;
  }
  setSkillFormGroup(skill) {
    this.skillFormGroup.setValue(skill);
  }
  getSkill(SKILL_ID, IS_TECHNICAL) {
    let newPath = this.apiUrl + 'Get?p_iId=' + SKILL_ID + '&p_iTechnical=' + IS_TECHNICAL
    return this.httpClient.get<any>(newPath);
  }
  addSkill(skill) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, skill)
  }
  updateSkill(skill) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, skill);
  }
  deleteSkill(skill) {
    let newPath = this.apiUrl + 'Delete';
    return this.httpClient.post<any>(newPath, skill)
  }
}