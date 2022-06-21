import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  apiUrl = 'https://webapi.cihancopur.com/City/';

  cityFormGroup: FormGroup = this.formBuilder.group({
    CITY_ID: ["0", Validators.required],
    CITY_TR: ["", Validators.required],
    CITY_EN: ["", Validators.required],
    COUNTRY: {
      COUNTRY_ID: "0",
      COUNTRY_TR: "",
      COUNTRY_EN: ""

    },
    X: "0",
    Y: "0"
  });
  initializeFormGroup() {
    this.cityFormGroup.setValue(
      {
        CITY_ID: "0",
        CITY_TR: "",
        CITY_EN: "",
        COUNTRY: {
          COUNTRY_ID: "0",
          COUNTRY_TR: "",
          COUNTRY_EN: ""
        },
        X: "0",
        Y: "0"
      }
    );
  }
  getCityFormGroup(): FormGroup {
    return this.cityFormGroup;
  }
  

  getCity(CITY_ID, COUNTRY_ID): Observable<any> {
    let newPath = this.apiUrl + 'Get?p_iId=' + CITY_ID + '&p_sCountryId=' + COUNTRY_ID;
    return this.httpClient.get<any>(newPath);

  }
  addCity(city) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, city);
  }
  updateCity(city) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, city);
  }
  pupulateForm(city) {
    this.cityFormGroup.setValue(city);
  }
}
