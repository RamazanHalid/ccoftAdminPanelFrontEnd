import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  apiUrl = 'https://webapi.cihancopur.com/Question/'
  // 0
  questionFormGrup: FormGroup = this.formBuilder.group({
    QUESTION_ID: 0,
    QUESTION_TR: "",
    QUESTION_EN: "",
    ANSWER_TR: "",
    ANSWER_EN: "",
    SORT: 0
  });
  initialize() {
    this.questionFormGrup.setValue({
      QUESTION_ID: 0,
      QUESTION_TR: "",
      QUESTION_EN: "",
      ANSWER_TR: "",
      ANSWER_EN: "",
      SORT: 0
    })
  }

  getQuestionFromGroup() {
    return this.questionFormGrup;
  }
  setQuestionFormGroup(question) {
    this.questionFormGrup.setValue(question);
  }

  getQuestion(QUESTION_ID) {
    let newPath = this.apiUrl + 'Get?p_iId=' + QUESTION_ID;
    return this.httpClient.get<any>(newPath)
  }
  addQuestion(question) {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, question);
  }
  updateQuestion(question) {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, question);
  }
  deleteQuestion(question) {
    let newPath = this.apiUrl + 'Delete';
    return this.httpClient.post<any>(newPath, question);
  }
}
