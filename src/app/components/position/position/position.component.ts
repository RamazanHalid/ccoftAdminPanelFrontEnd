import { Title } from '@angular/platform-browser';
import { CompanyService } from './../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { PositionService } from './../../../services/position.service';
import { Component, OnInit } from '@angular/core';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  position;
  companies;
  operation = "Yeni Pozisyon Ekle";
  constructor(private positionService: PositionService, private messageService: MessageService, private activatedRouter: ActivatedRoute, private route: Router,
    private companyService: CompanyService, private title: Title) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      if (params['positionId'] > 0) {
        this.operation = "Pozisyon Güncelle";
        this.getPosition(params['positionId'], -1);
      } else {
        this.position = this.positionService.getPositionFormGroup().value;
      }
    })
    this.getCompany(0);
    this.title.setTitle('Pozisyon')

  }
  public format: FormatSettings = {
    displayFormat: "dd/MM/yyyy",
    inputFormat: "dd/MM/yyyy",
  };
  public format2: FormatSettings = {
    displayFormat: "dd/MM/yyyy",
    inputFormat: "dd/MM/yyyy",
  };
  onSubmit() {
    this.positionService.setPositionFormGroup(this.position);
    if (this.positionService.getPositionFormGroup().valid) {
      let pstObj = this.positionService.getPositionFormGroup().value;
      if (pstObj.POSITION_ID == 0) {
        this.addPosition(pstObj);
      }
      else {
        this.updatePosition(pstObj)
      }
    }
    else {
      this.messageService.swalErrorMessage("Lütfen tüm alanları doğru şekilde doldurunuz")
    }
  }
  getPosition(POSITION_ID, COMPANY_ID) {
    this.positionService.getPosition(POSITION_ID, COMPANY_ID).subscribe(response => {
      this.position = response.m_cData[0];
      let splitedStartDate = this.position.START_DATE.split('-')
      this.position.START_DATE = new Date(splitedStartDate[0], splitedStartDate[1] - 1, splitedStartDate[2].split('T')[0])
      let splitedEndDate = this.position.END_DATE.split('-')
      this.position.END_DATE = new Date(splitedEndDate[0], splitedEndDate[1] - 1, splitedEndDate[2].split('T')[0])
    })
  }
  getCompany(COMPANY_ID) {
    this.companyService.getCompany(COMPANY_ID).subscribe(response => {
      this.companies = response.m_cData;
      if (this.position.COMPANY.COMPANY_ID == 0) {
        this.position.COMPANY = this.companies[0];
      }

    })
  }

  addPosition(position) {
    this.positionService.addPosition(position).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }

  updatePosition(position) {
    this.positionService.updatePosition(position).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }

  onClose() {

  }
}
