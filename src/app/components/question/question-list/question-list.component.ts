import { Title } from '@angular/platform-browser';
import { MessageService } from './../../../services/message.service';
import { Router } from '@angular/router';
import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions;
  constructor(private questionService: QuestionService, private router: Router, private messageService: MessageService, private title: Title) { }

  ngOnInit(): void {
    this.getQuestion(0)
    this.title.setTitle('Sorular')
  }

  getQuestion(QUESTION_ID) {
    this.questionService.getQuestion(QUESTION_ID).subscribe(response => {
      this.questions = response.m_cData;
    })
  }
  onCreate() {
    this.questionService.initialize();
    this.router.navigate(['admin/question/' + 0])
  }
  onEdit(question) {
    this.router.navigate(['admin/question/' + question.QUESTION_ID])

  }
  onDelete(question) {
    this.messageService.swalConfirm(question.QUESTION_TR, 'Bu soruyu silmek istediğinizden emin misiniz?').then(result => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(question).subscribe(response => {
          if (response.m_eProcessState == 1) {
            this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result2 => {
                this.getQuestion(0)
              })
          }
          else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
              .then()
          }
        }, responseError => {
          this.messageService.swalErrorMessage(responseError.message);
        })
      }
    })
  }
}
