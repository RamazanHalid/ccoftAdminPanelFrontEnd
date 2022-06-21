import { Title } from '@angular/platform-browser';
import { MessageService } from './../../../services/message.service';
import { FileService } from './../../../services/file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MyUploadAdapter } from './../../myUploadAdapter';
import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckEditor';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public company;
  operation = "Yeni Şirket Ekle"
  public format: FormatSettings = {
    displayFormat: "dd/MM/yyyy",
    inputFormat: "dd/MM/yyyy",
  };
  public format2: FormatSettings = {
    displayFormat: "dd/MM/yyyy",
    inputFormat: "dd/MM/yyyy",
  };


  progress;
  ImageUrl;
  public EditorTr3 = ClassicEditor;
  public EditorEn3 = ClassicEditor;
  constructor(private companyService: CompanyService, private activatedRouter: ActivatedRoute, private fileService: FileService, private datePipe: DatePipe, private title: Title,
    private messageService: MessageService, private router: Router) { }
  ckConfig = {

  }
  ngOnInit(): void {
    this.title.setTitle("Şirket")
    this.activatedRouter.params.subscribe(params => {
      if (params['companyId'] > 0) {
        this.operation = "Şirket Güncelle"
        this.getCompany(params['companyId']);
      }
      else {
        this.getCompanyFormGroup();
      }
    })
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
          this.company.LOGO = event.body.url;
          this.ImageUrl = event.body.url
          break;
        default:
          break;
      }
    });
  }

  getCompany(COMPANY_ID) {
    this.companyService.getCompany(COMPANY_ID).subscribe(response => {
      this.company = response.m_cData[0];
      let splitedStartDate = this.company.START_DATE.split('-')
      this.company.START_DATE = new Date(splitedStartDate[0], splitedStartDate[1] - 1, splitedStartDate[2].split('T')[0])
      let splitedEndDate = this.company.END_DATE.split('-')
      this.company.END_DATE = new Date(splitedEndDate[0], splitedEndDate[1] - 1, splitedEndDate[2].split('T')[0])
    })
  }
  getCompanyFormGroup() {
    this.company = this.companyService.getCompanyFormGroup().value;
  }

  onSubmit() {
    this.convertDates()
    this.companyService.setCompanyFormGroup(this.company);
    if (this.companyService.getCompanyFormGroup().valid) {
      let comObj = Object.assign({}, this.companyService.getCompanyFormGroup().value)
      if (comObj.COMPANY_ID == 0) {
        this.addCompany(comObj);
      }
      else {
        this.updateCompany(comObj);
      }
    }
  }
  addCompany(company) {
    this.companyService.addCompany(company).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }

  updateCompany(company) {
    this.companyService.updateCompany(company).subscribe(response => {
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
    this.router.navigate(['admin/company-list'])
  }
  convertDates() {
    this.company.START_DATE = this.datePipe.transform(this.company.START_DATE, 'yyyy-MM-dd');
    this.company.END_DATE = this.datePipe.transform(this.company.END_DATE, 'yyyy-MM-dd');

  }
  deneme35(event){
    console.log(event);
    
  }
}
