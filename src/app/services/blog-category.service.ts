import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {


  blogCategoryFormGroup: FormGroup = this.formBuilder.group({
    BLOG_CATEGORY_ID: 0,
    BLOG_CATEGORY_TR: "",
    BLOG_CATEGORY_EN: "",
    BLOG_COUNT: 0
  });

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }


  apiUrl = 'https://webapi.cihancopur.com/BlogCategory/';

  initializeFormGroup() {
    this.blogCategoryFormGroup.setValue({
      BLOG_CATEGORY_ID: 0,
      BLOG_CATEGORY_TR: "",
      BLOG_CATEGORY_EN: "",
      BLOG_COUNT: 0
    })
  }
  getBlogCategoryFormGroup() {
    return this.blogCategoryFormGroup
  }
  setBlogCategoryFormGroup(blogCategory) {
    this.blogCategoryFormGroup.setValue(blogCategory)
  }
  getBlogCategory(id): Observable<any> {
    let newPath = this.apiUrl + 'Get?p_iId=' + id;
    return this.httpClient.get<any>(newPath);
  }

  addBlogCategory(blogCategory):Observable<any>{
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath,blogCategory);
  }
  updateBlogCategory(blogCategory){
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath,blogCategory);
  }

  deleteBlogCategory(blogCategory){
    let newPath = this.apiUrl + 'Delete';
    return this.httpClient.post<any>(newPath, blogCategory);
  }
}
