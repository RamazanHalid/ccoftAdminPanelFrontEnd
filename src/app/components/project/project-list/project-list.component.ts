import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { ProjectService } from './../../../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects;
  category;
  constructor(private projectService: ProjectService, private messageService: MessageService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.getProject(-1, -1, -1, -1)
    this.title.setTitle('Projeler')
  }

  getProject(PROJECT_ID, TOP, CATEGORY_ID, IS_PUBLISHED) {
    this.projectService.getProject(PROJECT_ID, TOP, CATEGORY_ID, IS_PUBLISHED).subscribe(response => {
      this.projects = response.m_cData;
      console.log(this.projects);


    })
  }

  pickCategory(project) {

    
    if (project.IS_WEB) {
      console.log('1');
      return 'Web Uygulaması'
    }
    else if (project.IS_MOBILE) {
      console.log('1');
      return 'Mobile Uygulaması'
    }
    else if (project.IS_DESKTOP) {
      console.log('1');
      return 'Masaüstü Uygulaması'
    }
    return 'Kategori yok!'

  }
  onCreate() {
    this.projectService.initialize();
    this.router.navigate(['admin/project/0']);
  }
  onEdit(project) {
    this.router.navigate(['admin/project/' + project.PROJECT_ID])
  }

  onDelete(project) {
    this.messageService.swalConfirm(project.HEADER_TR, 'Bu projeyi silmek istediğnizden emin misiniz?').then(result => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(project).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result2 => {
                this.getProject(-1, -1, -1, -1)
              })
          }
          else {
            this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
              .then()
          }
        });
      }
    })

  }
}
