import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from './../../../services/message.service';
import { CityService } from './../../../services/city.service';
import { CountryService } from './../../../services/country.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  countries;
  cityCountryId;
  result: any;
  selected;
  cityFormGroup: FormGroup;
  operation = "Yeni Şehir ekle"


  constructor(private countryService: CountryService,
    private cityService: CityService, private messageService: MessageService, private router: Router
  ) { }
  ngOnInit(): void {
    this.getCityFromGroup();
    this.getCountry(0)

  }
  getCityFromGroup() {
    this.cityFormGroup = this.cityService.getCityFormGroup();
    if (this.cityFormGroup.get("CITY_ID").value > 0) {
      this.operation = 'Şehri Güncelle'
    }
  }
  onSubmit() {
    this.cityService.cityFormGroup = this.cityFormGroup;
    if (this.cityService.cityFormGroup.valid) {
      if (this.cityService.cityFormGroup.get("CITY_ID").value == 0) {
        this.cityService.addCity(this.cityService.cityFormGroup.value).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result => {
                this.onClose()
              })
          } else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          }
        });
      } else {
        this.cityService.updateCity(this.cityService.cityFormGroup.value).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService
              .swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result => {
              })
          } else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          }
        })
      }
    }
    else {
      this.messageService.swalErrorMessage("Validasayonlar tam degil ")
    }
  }
  onClose() {
    this.cityService.cityFormGroup.reset();
    this.cityService.initializeFormGroup();
    this.router.navigate(['admin/country-city'])

  }
  getCountry(id) {
    this.countryService.getCountry(id).subscribe(response => {
      this.countries = response.m_cData;
      this.result = this.countries[0];
      if (parseInt(this.cityFormGroup.get("CITY_ID").value) > 0) {
        let selectedCountryId = this.cityFormGroup.value.COUNTRY.COUNTRY_ID
        let a = this.countries.find(c => c.COUNTRY_ID == selectedCountryId)
        this.result = a
      }
    })
  }
  CountriesCities(event: any) {
    // let de = event.target.value;
  }
}