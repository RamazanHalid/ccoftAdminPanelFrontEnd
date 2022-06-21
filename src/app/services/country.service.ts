import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl = 'https://webapi.cihancopur.com/Country/'


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  
  countryFormGroup: FormGroup = this.formBuilder.group({
    COUNTRY_ID: ["0"],
    COUNTRY_TR: ["", Validators.required],
    COUNTRY_EN: ["", Validators.required],
  })

  initializeFormGroup() {
    this.countryFormGroup.setValue({
      COUNTRY_ID: "0",
      COUNTRY_TR: "",
      COUNTRY_EN: "",

    });
  }


  getCountryFormGroup(): FormGroup {
    return this.countryFormGroup;
  }

  getCountry(id: number): Observable<any> {
    let newPath = this.apiUrl + 'Get?p_iId=' + id;
    return this.httpClient.get<any>(newPath);

  }
  addCountry(country) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, country);
  }

  updateCountry(country) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, country);

  }

  pupulateForm(country) {
    this.countryFormGroup.setValue(country);
  }

  deleteCountry(id){
    let newPath = this.apiUrl + 'Delete'
  }

}
