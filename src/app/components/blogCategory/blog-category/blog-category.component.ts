import { Router } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { BlogCategoryService } from './../../../services/blog-category.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent implements OnInit {

  blogCategory;
  operation = "Yeni kategori ekle"
  message;
  constructor(private blogCategoryService: BlogCategoryService,
    private messageService: MessageService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Kategori")
    this.getBlogCategory()
  }


  getBlogCategory() {
    this.blogCategory = this.blogCategoryService.getBlogCategoryFormGroup().value
    if (this.blogCategory.BLOG_CATEGORY_ID > 0) {
      this.operation = "Kategori Güncelle"
    }
  }
  onSubmit() {
    this.blogCategoryService.setBlogCategoryFormGroup(this.blogCategory);
    if (this.blogCategoryService.getBlogCategoryFormGroup().valid) {
      let blogCategoryObj = Object.assign({}, this.blogCategoryService.getBlogCategoryFormGroup().value)
      if (blogCategoryObj.BLOG_CATEGORY_ID == 0) {
        this.addBlogCategory(blogCategoryObj);
      }
      else {
        this.updateBlogCategory(blogCategoryObj)
      }
    }
  }

  addBlogCategory(blogCategory) {
    this.blogCategoryService.addBlogCategory(blogCategory).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose());
      } else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          .then();
      }
    })
  }

  updateBlogCategory(blogCategory) {
    this.blogCategoryService.updateBlogCategory(blogCategory).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose());
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
          .then();
      }
    })
  }

  onClose() {
    this.router.navigate(["admin/blog-category-list"]);
  }
}
