import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { ExpertiseService } from './../../../services/expertise.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expertise-list',
  templateUrl: './expertise-list.component.html',
  styleUrls: ['./expertise-list.component.css']
})
export class ExpertiseListComponent implements OnInit {

  constructor(private expertiseService: ExpertiseService, private messageService: MessageService, private router: Router, private title: Title, private activatedRoute: ActivatedRoute) { }

  expertises;

  ngOnInit(): void {
    

    this.getExpertise(0);
    this.title.setTitle('Uzmanlıklar')
  }

  getExpertise(id) {
    this.expertiseService.getExpertise(id).subscribe(response => {
      this.expertises = response.m_cData;
    })
  }
  onCreate() {
    this.expertiseService.initializeFormGroup();
    this.router.navigate(['admin/expertise']);
  }
  onEdit(expertise) {
    this.expertiseService.setExpertiseFormGroup(expertise);
    this.router.navigate(['admin/expertise']);
  }
}
