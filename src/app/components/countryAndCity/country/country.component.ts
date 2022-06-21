import { Router } from '@angular/router';

import { MessageService } from './../../../services/message.service';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  operation = "Yeni Ülke ekle"
  message: string;
  countryFormGroup: FormGroup;
  constructor(public countryService: CountryService,
    private messageService: MessageService, private router: Router) { }
  ngOnInit(): void {
    this.getCountryFormGroupForm();
  }
  getCountryFormGroupForm() {
    this.countryFormGroup = this.countryService.getCountryFormGroup();
    if (this.countryFormGroup.get("COUNTRY_ID").value > 0) {
      this.operation = "Ülkeyi Güncelle"
    }
  }
  onSubmit() {
    if (this.countryFormGroup.valid) {
      if (this.countryFormGroup.get('COUNTRY_ID').value === "0") {
        this.countryService.addCountry(this.countryFormGroup.value).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService
              .swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result => this.onClose()
              )
          } else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          }
        });
      }
      else {
        this.countryService.updateCountry(this.countryFormGroup.value).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService
              .swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result => this.onClose());
          }
          else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          }
        });
      }
    }
    else {
      this.message = 'Lütfen tüm alanları doldurunuz'
    }
  }
  onClose() {
    this.countryService.countryFormGroup.reset();
    this.countryService.initializeFormGroup();
    this, this.router.navigate(['admin/country-city'])
  }
}
