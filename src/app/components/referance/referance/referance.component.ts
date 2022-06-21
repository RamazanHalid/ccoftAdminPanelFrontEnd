import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { ReferanceService } from 'src/app/services/referance.service';

@Component({
  selector: 'app-referance',
  templateUrl: './referance.component.html',
  styleUrls: ['./referance.component.css']
})
export class ReferanceComponent implements OnInit {

  constructor(private referanceService: ReferanceService, private messageService: MessageService, private activatedRouter: ActivatedRoute, private router: Router,
    private title: Title) { }
  referance;
  operation = "Yeni Referans Ekle"
  ngOnInit(): void {

    this.activatedRouter.params.subscribe(params => {
      if (params['referanceId'] > 0) {
        this.operation = "Referans Güncelle"
        this.getReferance(params['referanceId'])
      }
      else {
        this.referance = this.referanceService.getReferanceFormGroup().value;
      }
    })
    this.title.setTitle('Referans')
  }

  getReferance(REFERANCE_ID) {
    this.referanceService.getReferance(REFERANCE_ID).subscribe(response => {
      this.referance = response.m_cData[0];
    })
  }
  onSubmit() {
    this.referanceService.setReferanceFormGroup(this.referance);
    if (this.referanceService.getReferanceFormGroup().value) {
      let refObj = this.referanceService.getReferanceFormGroup().value;
      if (refObj.REFERANCE_ID == 0) {
        this.addReferance(refObj)
      }
      else {
        this.updateReferance(refObj)
      }
    }
    else {
      this.messageService.swalErrorMessage("Lütfen alanları gerektiği gibi doldurunuz.")
    }

  }
  addReferance(referance) {
    this.referanceService.addReferance(referance).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }
  updateReferance(referance) {
    this.referanceService.updateReferance(referance).subscribe(response => {
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
    this.router.navigate(['admin/referance-list'])
  }
}
