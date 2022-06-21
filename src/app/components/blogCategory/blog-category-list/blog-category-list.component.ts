import { MessageService } from './../../../services/message.service';
import { Router } from '@angular/router';
import { BlogCategoryService } from './../../../services/blog-category.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-category-list',
  templateUrl: './blog-category-list.component.html',
  styleUrls: ['./blog-category-list.component.css']
})
export class BlogCategoryListComponent implements OnInit {

  blogCategories;
  constructor(private blogCategoryService: BlogCategoryService, private router: Router, private messageService: MessageService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Kategori Listesi")
    this.getBlogCategory(0)
  }
  getBlogCategory(id) {
    this.blogCategoryService.getBlogCategory(id).subscribe(response => {
      this.blogCategories = response.m_cData;
    })
  }
  onCreate() {
    this.blogCategoryService.initializeFormGroup()
    this.router.navigate(['admin/blog-category'])
  }
  onEdit(blogCategory) {
    this.blogCategoryService.setBlogCategoryFormGroup(blogCategory);
    this.router.navigate(['admin/blog-category'])
  }
  onDelete(blogCategory) {
    if (blogCategory.BLOG_COUNT == 0) {
      this.blogCategoryService.deleteBlogCategory(blogCategory).subscribe(response => {
        if (response.m_eProcessState == 1) {
          this.messageService.swalSuccessMessage("Category başarı ile silinmiştir!")
        }
      });
    }
    else {
      this.messageService.swalErrorMessage('Lütfen bu kategoriye ait olan ' + blogCategory.BLOG_COUNT + ' tane yazıyı siliniz!')
    }
  }
}
