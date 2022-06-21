import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl = 'https://webapi.cihancopur.com/Blog/';
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  blogFormGroup: FormGroup = this.formBuilder.group({
    BLOG_ID: 0,
    CITY: {
      CITY_ID: "",
      COUNTRY: {
        COUNTRY_ID: "",
        COUNTRY_TR: "",
        COUNTRY_EN: ""
      },
      CITY_TR: "",
      CITY_EN: "",
      X: "",
      Y: ""
    },
    BLOG_CATEGORY: {
      BLOG_CATEGORY_ID: "",
      BLOG_CATEGORY_TR: "",
      BLOG_CATEGORY_EN: "",
      BLOG_COUNT: 0
    },
    HEADER_TR: "",
    HEADER_EN: "",
    SUMMARY_TR: "",
    SUMMARY_EN: "",
    SHORT_HEADER_TR: "",
    SHORT_HEADER_EN: "",
    BLOG_TEXT_TR: "",
    BLOG_TEXT_EN: "",
    DATE: "",
    IS_PUBLISHED: true,
    COUNTER: 0,
    IMAGE: "",
    KEYWORD: ""
  })

  initializeFormGroup() {
    this.blogFormGroup.setValue({
      BLOG_ID: 0,
      CITY: {
        CITY_ID: "",
        COUNTRY: {
          COUNTRY_ID: "",
          COUNTRY_TR: "",
          COUNTRY_EN: ""
        },
        CITY_TR: "",
        CITY_EN: "",
        X: 0,
        Y: 0
      },
      BLOG_CATEGORY: {
        BLOG_CATEGORY_ID: "",
        BLOG_CATEGORY_TR: "",
        BLOG_CATEGORY_EN: "",
        BLOG_COUNT: 0
      },
      HEADER_TR: "",
      HEADER_EN: "",
      SUMMARY_TR: "",
      SUMMARY_EN: "",
      SHORT_HEADER_TR: "",
      SHORT_HEADER_EN: "",
      BLOG_TEXT_TR: "",
      BLOG_TEXT_EN: "",
      DATE: "",
      IS_PUBLISHED: true,
      COUNTER: 0,
      IMAGE: "",
      KEYWORD: ""

    })
  }
  getBlogFormGroup(): FormGroup {
    return this.blogFormGroup;
  }
  setBlogFormGroup(blog) {
    this.blogFormGroup.setValue(blog);
  }

  getBlog(BLOG_ID, TOP_COUNT, CATEGORY_ID, IS_PUBLISHED): Observable<any> {
    let newPath = this.apiUrl + 'Get?p_iId=' + BLOG_ID + '&p_iTopCount='
      + TOP_COUNT + '&p_iCategoryId=' + CATEGORY_ID + '&p_iPublished=' + IS_PUBLISHED;
    return this.httpClient.get<any>(newPath)
  }

  addBlog(blog): Observable<any> {
    let newPath = this.apiUrl + 'Add';
    return this.httpClient.post<any>(newPath, blog);
  }
  updateBlog(blog): Observable<any> {
    let newPath = this.apiUrl + 'Update';
    return this.httpClient.post<any>(newPath, blog);
  }
  deleteBlog(blog): Observable<any>{
    let newPath = this.apiUrl + 'Delete';
    return this.httpClient.post<any>(newPath,blog);
  }

}
