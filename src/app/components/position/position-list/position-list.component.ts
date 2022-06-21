import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { PositionService } from './../../../services/position.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {
  closeResult = '';
  constructor(private positionService: PositionService, private messageService: MessageService, private router: Router, private title: Title) { }
  positions;
  ngOnInit(): void {
    this.getPosition(0, 0);
    this.title.setTitle('Pozisyonlar')
  }

  getPosition(POSITION_ID, COMPANY_ID) {
    this.positionService.getPosition(POSITION_ID, COMPANY_ID).subscribe(response => {
      this.positions = response.m_cData;
    })
  }
  onCreate() {
    this.positionService.initialize();
    this.router.navigate(['admin/position/0'])
  }
  onEdit(position) {
    this.router.navigate(['admin/position/' + position.POSITION_ID])
  }

}
