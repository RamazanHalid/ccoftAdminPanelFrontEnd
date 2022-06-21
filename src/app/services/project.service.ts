import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  apiUrl = 'https://webapi.cihancopur.com/Project/'

  getProject(PROJECT_ID, TOP, CATEGORY_ID, IS_PUBLISHED) {
    let newPath = this.apiUrl + 'Get?p_iId=' + PROJECT_ID + '&p_iTopCount=' + TOP + '&p_iCategoryId=' + CATEGORY_ID + '&p_iPublished=' + IS_PUBLISHED;
    return this.httpClient.get<any>(newPath);
  }

  addProject(project) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, project);
  }
  updateProject(project) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, project);
  }
  deleteProject(project) {
    let newPath = this.apiUrl + 'Delete';
    return this.httpClient.post<any>(newPath, project);
  }

  projectFormGroup: FormGroup = this.formBuilder.group({
    PROJECT_ID: 0,
    COMPANY: {
      COMPANY_ID: 0,
      NAME_TR: "",
      NAME_EN: "",
      TEXT_TR: "",
      TEXT_EN: "",
      START_DATE: "",
      END_DATE: "",
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
    },
    HEADER_TR: "",
    HEADER_EN: "",
    SUMMARY_TR: "",
    SUMMARY_EN: "",
    SHORT_HEADER_TR: "",
    SHORT_HEADER_EN: "",
    BLOG_TEXT_TR: "",
    BLOG_TEXT_EN: "",
    ON_GOING: true,
    START_DATE: new Date(),
    END_DATE: new Date(),
    IS_PUBLISHED: true,
    COUNTER: 0,
    IMAGE: "",
    KEYWORD: "",
    IS_DESKTOP: true,
    IS_MOBILE: true,
    IS_WEB: true,
    INFO_TR: "",
    INFO_EN: "",
    TOTAL_DAY: 0,
    DATE: "",
    SORT: 0
  })
  initialize() {
    this.projectFormGroup.setValue({
      PROJECT_ID: 0,
      COMPANY: {
        COMPANY_ID: 0,
        NAME_TR: "",
        NAME_EN: "",
        TEXT_TR: "",
        TEXT_EN: "",
        START_DATE: "",
        END_DATE: "",
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
      },
      HEADER_TR: "",
      HEADER_EN: "",
      SUMMARY_TR: "",
      SUMMARY_EN: "",
      SHORT_HEADER_TR: "",
      SHORT_HEADER_EN: "",
      BLOG_TEXT_TR: "",
      BLOG_TEXT_EN: "",
      ON_GOING: true,
      START_DATE: new Date(),
      END_DATE: new Date(),
      IS_PUBLISHED: true,
      COUNTER: 0,
      IMAGE: "",
      KEYWORD: "",
      IS_DESKTOP: true,
      IS_MOBILE: true,
      IS_WEB: true,
      INFO_TR: "",
      INFO_EN: "",
      TOTAL_DAY: 0,
      DATE: "",
      SORT: 0
    })
  }
  getPorjectFormGroup() {
    return this.projectFormGroup;
  }
  setPorjectFormGroup(project) {
    this.projectFormGroup.setValue(project);
  }
}
