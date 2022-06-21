import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileService } from './../../../services/file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MessageService } from './../../../services/message.service';
import { ExpertiseService } from './../../../services/expertise.service';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckEditor';
import { MyUploadAdapter } from './../../myUploadAdapter';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {
  expertise;
  progress;
  ImageUrl;
  operation = "Yeni Uzmanlık Ekle"
  public EditorTr2 = ClassicEditor;
  public EditorEn2 = ClassicEditor;
  public ckConfig = {

  };
  constructor(private expertiseService: ExpertiseService, private messageService: MessageService, private fileService: FileService,
    private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.getExpertise();
    this.title.setTitle('Uzmanlık')
  }

  getExpertise() {
    this.expertise = this.expertiseService.getExpertiseFormGroup().value;
    if (this.expertise.EXPERTISE_ID > 0) {
      this.operation = "Uzmanlık Güncelle"
      this.ImageUrl = this.expertise.IMAGE
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

  onImageChange(event) {
    const selectedImage = event.target.files[0];
    this.fileService.uploadImage2(selectedImage).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.expertise.IMAGE = event.body.url;
          this.ImageUrl = event.body.url
          break;
        default:
          break;
      }
    });
  }
  onSubmit() {

    this.expertiseService.setExpertiseFormGroup(this.expertise);
    if (this.expertiseService.getExpertiseFormGroup().valid) {
      let expObj = this.expertiseService.getExpertiseFormGroup().value;
      if (expObj.EXPERTISE_ID == 0) {
        this.add(expObj);
      }
      else {
        this.update(expObj)
      }

    }
  }
  add(expertise) {
    this.expertiseService.addExpertise(expertise).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }
  update(expertise) {
    this.expertiseService.updateExpertise(expertise).subscribe(response => {
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
    this.router.navigate(['admin/expertise-list'])
  }
}
