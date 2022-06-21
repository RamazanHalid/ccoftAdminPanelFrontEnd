import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  apiUrl = 'https://webapi.cihancopur.com/Position/';
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  positionFormGroup: FormGroup = this.formBuilder.group({
    POSITION_ID: 0,
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
    POSITION_TR: "",
    POSITION_EN: "",
    START_DATE: new Date(),
    END_DATE: new Date(),
    ON_GOING: true,
    INFO_TR: "",
    INFO_EN: "",
    TOTAL_DAY: 0,
    DATE: ""
  })

  initialize() {
    this.positionFormGroup.setValue({
      POSITION_ID: 0,
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
      POSITION_TR: "",
      POSITION_EN: "",
      START_DATE: new Date(),
      END_DATE: new Date(),
      ON_GOING: true,
      INFO_TR: "",
      INFO_EN: "",
      TOTAL_DAY: 0,
      DATE: ""
    })
  }

  getPositionFormGroup() {
    return this.positionFormGroup;
  }
  setPositionFormGroup(position) {
    this.positionFormGroup.setValue(position);
  }
  getPosition(POSITION_ID, COMPANY_ID) {
    let newPath = this.apiUrl + 'Get?p_iId=' + POSITION_ID + '&p_iCompanyId=' + COMPANY_ID
    return this.httpClient.get<any>(newPath);
  }
  addPosition(position) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, position);
  }
  updatePosition(position) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, position);
  }
}

