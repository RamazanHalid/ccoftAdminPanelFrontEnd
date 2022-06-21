import { CompanyService } from './../../../services/company.service';
import { FileService } from './../../../services/file.service';
import { MessageService } from './../../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from './../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckEditor';
import { MyUploadAdapter } from "../../myUploadAdapter";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router,
    private messageService: MessageService, private activatedRouter: ActivatedRoute, private fileService: FileService, private companyService: CompanyService) { }
  project;
  companyS;
  companies;
  operation = "Proje Ekle"
  public EditorTr = ClassicEditor;
  public EditorEn = ClassicEditor;
  ImageUrl;
  progress;
  public ckConfig = {

  };
  category = "1";
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      if (params['projectId'] > 0) {
        this.operation = 'Proje Güncelle'
        this.getProject(params['projectId'], -1, -1, -1);
        console.log(this.getProject(params['projectId'], -1, -1, -1));

      }
      else {
        this.project = this.projectService.getPorjectFormGroup().value;
      }
    })
    this.getCompany(0);
  }
  public format: FormatSettings = {
    displayFormat: "dd/MM/yyyy",
    inputFormat: "dd/MM/yyyy",
  };
  public format2: FormatSettings = {
    displayFormat: "dd/MM/yyyy",
    inputFormat: "dd/MM/yyyy",
  };
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

          this.project.IMAGE = event.body.url
          break;
        default:
          break;
      }
    });
  }

  categoryPicker(category) {
    this.project.IS_DESKTOP = false;
    this.project.IS_MOBILE = false;
    this.project.IS_WEB = false;

    switch (category) {
      case "1":
        this.project.IS_DESKTOP = true;
        break;
      case "2":
        this.project.IS_MOBILE = true;
        break;
      case "3":
        this.project.IS_WEB = true;
        break;
      default:
        break;
    }
  }

  getProject(PROJECT_ID, TOP, CATEGORY_ID, IS_PUBLISHED) {
    this.projectService.getProject(PROJECT_ID, TOP, CATEGORY_ID, IS_PUBLISHED).subscribe(response => {
      this.project = response.m_cData[0];
      let splitedStartDate = this.project.START_DATE.split('-')
      this.project.START_DATE = new Date(splitedStartDate[0], splitedStartDate[1] - 1, splitedStartDate[2].split('T')[0])
      let splitedEndDate = this.project.END_DATE.split('-')
      this.project.END_DATE = new Date(splitedEndDate[0], splitedEndDate[1] - 1, splitedEndDate[2].split('T')[0])
    })
  }
  onSubmit() {

    this.categoryPicker(this.category);
    this.projectService.setPorjectFormGroup(this.project);
    console.log(this.projectService.getPorjectFormGroup().value);

    if (this.projectService.getPorjectFormGroup().valid) {
      let prjObj = Object.assign({}, this.projectService.getPorjectFormGroup().value);
      if (prjObj.PROJECT_ID == 0) {
        this.addProject(prjObj);
      }
      else {
        this.updateProject(prjObj)
      }
    }
  }
  addProject(project) {
    this.projectService.addProject(project).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }

  updateProject(project) {
    this.projectService.updateProject(project).subscribe(response => {
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
    this.router.navigate(['admin/project-list'])
  }
  getCompany(COMPANY_ID) {
    this.companyService.getCompany(COMPANY_ID).subscribe(response => {
      this.companies = response.m_cData;
      if (this.project.PROJECT_ID == 0) {
        this.project.COMPANY.COMPANY_ID = this.companies[0].COMPANY_ID;
      }
    })

  }
}
