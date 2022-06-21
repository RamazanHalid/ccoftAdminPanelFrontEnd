import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { SkillService } from './../../../services/skill.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  skills
  constructor(private skillService: SkillService, private messageService: MessageService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Beceriler')
    this.getSkill(0, -1);
  }


  getSkill(SKILL_ID, IS_TECHNICAL) {
    this.skillService.getSkill(SKILL_ID, IS_TECHNICAL).subscribe(response => {
      this.skills = response.m_cData;
    })
  }


  onCreate() {
    this.router.navigate(['admin/skill/' + 0])
  }
  onEdit(skill) {
    this.router.navigate(['admin/skill/' + skill.SKILL_ID])
  }
  onDelete(skill) {
    this.messageService.swalConfirm("Beceri", "Bu beceriyi silmek istediğinizden emin misiniz?").then(result => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(skill).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result2 => {
                this.getSkill(0, -1)
              })
          }
          else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
              .then()
          }
        })
      }
    })
  }
}
