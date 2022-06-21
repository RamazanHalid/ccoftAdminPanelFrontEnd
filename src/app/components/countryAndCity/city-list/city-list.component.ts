import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { CountryService } from 'src/app/services/country.service';
import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  constructor(public cityService: CityService,
    private countryService: CountryService,
    private messageService: MessageService,
    private router: Router) { }

  cities: any;
  countries: any;

  ngOnInit(): void {
    this.getCity(0, "");
    this.getCountry(0);
  }

  getCity(CITY_ID, COUNTRY_ID) {
    this.cityService.getCity(CITY_ID, COUNTRY_ID).subscribe(response => {
      this.cities = response.m_cData
    

    });
  }
  getCountry(COUNTRY_ID) {
    this.countryService.getCountry(COUNTRY_ID).subscribe(response => this.countries = response.m_cData)
  }

  onCreate() {
    this.cityService.cityFormGroup.reset();
    this.cityService.initializeFormGroup();
    this.router.navigate(['/admin/city']);
  }
  onEdit(city) {
    this.cityService.pupulateForm(city);
    this.router.navigate(['/admin/city']);
  }
  selectedValue: string = '';
  CountriesCities(event: any) {
    let id = event.target.value;
    this.getCity(0, id)


  }

}
