import { Title } from '@angular/platform-browser';
import { MessageService } from './../../../services/message.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReferanceService } from 'src/app/services/referance.service';

@Component({
  selector: 'app-referance-list',
  templateUrl: './referance-list.component.html',
  styleUrls: ['./referance-list.component.css']
})
export class ReferanceListComponent implements OnInit {
  referances;
  constructor(private referanceService: ReferanceService, private router: Router, private messageService: MessageService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Referanslar')
    this.getReferance(0)
  }

  getReferance(REFERANCE_ID) {
    this.referanceService.getReferance(REFERANCE_ID).subscribe(response => {
      this.referances = response.m_cData;
    })
  }
  onCreate() {
    this.referanceService.initialize()
    this.router.navigate(['admin/referance/' + 0])
  }
  onEdit(referance) {
    this.router.navigate(['admin/referance/' + referance.REFERANCE_ID])
  }
  onDelete(referance) {
    this.messageService.swalConfirm(referance.NAME_TR, "Bu referansı silmek istediğnizden emin misiniz?").then(result => {
      if (result.isConfirmed) {
        this.referanceService.deleteReferance(referance).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result2 => {
                this.getReferance(0)
              })
          }
          else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
              .then()
          }
        });
      }
    })
  }
}
