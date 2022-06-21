import { DialogService } from './../../../services/dialog.service';
import { Title } from '@angular/platform-browser';
import { MessageService } from './../../../services/message.service';
import { Router } from '@angular/router';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogService, private router: Router, private messageService: MessageService,
    private titleService: Title) { }
  blogs;
  ngOnInit(): void {
    this.titleService.setTitle("Blog Listesi")
    this.getBlog(0, 0, 0, -1)
  }

  getBlog(BLOG_ID, TOP_COUNT, CATEGORY_ID, IS_PUBLISHED) {
    this.blogService.getBlog(BLOG_ID, TOP_COUNT, CATEGORY_ID, IS_PUBLISHED).subscribe(response => {
      this.blogs = response.m_cData
    })
  }
  onCreate() {

    this.blogService.initializeFormGroup()
    this.router.navigate(['/admin/blog'])
  }
  onDelete(blog) {
    this.blogService.setBlogFormGroup(blog)
    this.messageService.swalConfirm(blog.BLOG_HEADER_TR, "Bu blog yazısını silmek istediğinizden emin misiniz?").then(result => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(this.blogService.getBlogFormGroup().value).subscribe(response => {
          if (response.m_eProcessState === 1) {
            this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
              .then(result2 => {
                this.getBlog(0, 0, 0, -1)
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
  onEdit(blog) {
    this.blogService.setBlogFormGroup(blog);
    this.router.navigate(['/admin/blog'])
  }
}
