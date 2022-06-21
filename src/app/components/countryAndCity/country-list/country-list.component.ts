import { CountryComponent } from './../country/country.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: any;
  country2: any;
  s: any = 'ramazan'
  closeModal: string;
  constructor(private countryService: CountryService,
    private messageService: MessageService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCountry(0)
  }
  getCountry(id: number) {
    this.countryService.getCountry(id).subscribe(response => this.countries = response.m_cData)
  }
  onCreate() {
    this.countryService.initializeFormGroup();
    this.router.navigate(["/admin/country"])
  }
  onEdit(country) {
    this.countryService.pupulateForm(country);
    this.router.navigate(["/admin/country"])
  }
  onDelete(country) {
    this.messageService.swalConfirm(country.COUNTRY_TR + '/' + country.COUNTRY_EN,
      'Bu ülkeyi SİLMEK istediğnizden emin misiniz?')
      .then(result => {
        if (result.isConfirmed) {
        }
      })
  }

}
