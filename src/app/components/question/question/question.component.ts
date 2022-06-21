import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question;
  operation = "Yeni Soru Ekle"
  constructor(private questionService: QuestionService, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['questionId'] > 0) {
        this.operation = 'Soru Güncelle'
        this.getQuestion(params['questionId']);
      }
      else {
        this.question = this.questionService.getQuestionFromGroup().value;
      }
    })

    this.title.setTitle('Soru')
  }

  getQuestion(QUESTION_ID) {
    this.questionService.getQuestion(QUESTION_ID).subscribe(response => {
      this.question = response.m_cData[0];
    })
  }
  onSubmit() {
    this.questionService.setQuestionFormGroup(this.question);
    if (this.questionService.getQuestionFromGroup().valid) {
      let qObj = Object.assign({}, this.questionService.getQuestionFromGroup().value)
      if (qObj.QUESTION_ID == 0) {
        this.addQuestion(qObj);
      }
      else {
        this.updateQuestion(qObj)
      }
    }
  }
  addQuestion(question) {
    this.questionService.addQuestion(question).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }
  updateQuestion(question) {
    this.questionService.updateQuestion(question).subscribe(response => {
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
    this.questionService.initialize()
    this.router.navigate(['admin/question-list'])
  }
}
