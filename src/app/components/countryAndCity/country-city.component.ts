import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-country-city',
  templateUrl: './country-city.component.html',
  styleUrls: ['./country-city.component.css']
})
export class CountryCityComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Ülkeler ve Şehirler")
  }

}
