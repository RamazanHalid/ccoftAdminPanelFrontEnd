import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { SkillService } from './../../../services/skill.service';
import { Component, OnInit } from '@angular/core';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckEditor';
import { MyUploadAdapter } from "../../myUploadAdapter";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skill;
  operation = "Beceri Ekle";
  public ckConfig = {

  };
  public EditorTr4 = ClassicEditor;
  public EditorEn4 = ClassicEditor;
  constructor(private skillService: SkillService, private messageService: MessageService, private rotuer: Router, private activatedRoute: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params['skillId'] > 0) {
        this.operation = "Beceri Güncelle"
        this.getSkill(params['skillId'], -1)
      } else {
        this.skill = this.skillService.getSkillFormGroup().value;
      }
    })
    this.title.setTitle('Beceri')

  }

  getSkill(SKILL_ID, IS_TECHNICAL) {
    this.skillService.getSkill(SKILL_ID, IS_TECHNICAL).subscribe(response => {
      this.skill = response.m_cData[0];
    })
  }
  onSubmit() {
    this.skillService.setSkillFormGroup(this.skill);
    if (this.skillService.getSkillFormGroup().valid) {
      let sklObj = Object.assign({}, this.skillService.getSkillFormGroup().value)
      if (sklObj.SKILL_ID == 0) {
        this.addSkill(sklObj)
      }
      else {
        this.updateSkill(sklObj)
      }
    }
    else {
      this.messageService.swalErrorMessage('Gerekl alanları doğru şekilde doldurunuz')
    }
  }
  onReady(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );

  }

  onReady2(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  addSkill(skill) {
    this.skillService.addSkill(skill).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }


  updateSkill(skill) {
    this.skillService.updateSkill(skill).subscribe(response => {
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
    this.rotuer.navigate(['admin/skill-list'])
  }
}
