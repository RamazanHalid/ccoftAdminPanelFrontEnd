import { Router } from '@angular/router';
import { CountryService } from './../../../services/country.service';
import { Title } from '@angular/platform-browser';
import { CityService } from './../../../services/city.service';
import { MessageService } from './../../../services/message.service';
import { BlogCategoryService } from './../../../services/blog-category.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileService } from './../../../services/file.service';
import { BlogService } from './../../../services/blog.service';
import { Component, forwardRef, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckEditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { MyUploadAdapter } from "../../myUploadAdapter";
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog;
  countryS;
  countries;
  allCities
  operation = "Blog Ekle"
  cities: any = [];
  blogCategories: any = [];
  public EditorTr = ClassicEditor;
  public EditorEn = ClassicEditor;
  imgPath = 'https://webapi.cihancopur.com/upload/Image/1000/';
  ImageUrl;
  progress;
  public ckConfig = {

  };

  constructor(private blogService: BlogService,
    private fileService: FileService,
    private blogCategoryService: BlogCategoryService,
    private messageService: MessageService,
    private cityService: CityService,
    private titleService: Title,
    private countryService: CountryService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Blog");

    this.getBlog()
    this.getBlogCategory(-1);
    this.getCountries(-1)
    this.getCity(0, "")
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
          this.blog.IMAGE = event.body.fileName;
          this.ImageUrl = event.body.url
          break;
        default:
          break;
      }
    });
  }
  deneme35(event){
    console.log(event.target.value);
    
  }

  getBlogCategory(id) {
    this.blogCategoryService.getBlogCategory(id).subscribe(response => {
      this.blogCategories = response.m_cData;
      if (this.blog.BLOG_ID == 0) {
        this.blog.BLOG_CATEGORY.BLOG_CATEGORY_ID = this.blogCategories[0].BLOG_CATEGORY_ID;
      }else {
        this.operation = "Blog Güncelle"
      }
    })
  }

  getCountries(id) {
    this.countryService.getCountry(id).subscribe(response => {
      this.countries = response.m_cData;
      if (this.blog.BLOG_ID == 0) {
        this.countryS = this.countries[0].COUNTRY_ID;
      } else {
        this.countryS = this.blog.CITY.COUNTRY.COUNTRY_ID;
      }
    })
  }

  getBlog() {
    this.blog = this.blogService.getBlogFormGroup().value;
    if (this.blog.IMAGE) {
      this.ImageUrl = this.imgPath + this.blog.IMAGE;
    }
  }

  changeCity(id) {
    this.cities = this.allCities.filter(c => c.COUNTRY.COUNTRY_ID == id)
    this.blog.CITY.CITY_ID = this.cities[0].CITY_ID
  }

  getCity(CITY_ID, COUNTRY_ID) {
    this.cityService.getCity(CITY_ID, COUNTRY_ID).subscribe(response => {
      this.allCities = response.m_cData;
      if (this.blog.BLOG_ID != 0) {

        this.cities = this.allCities.filter(c => c.COUNTRY.COUNTRY_ID == this.blog.CITY.COUNTRY.COUNTRY_ID)
      }
      else {
        this.cities = this.allCities.filter(c => c.COUNTRY.COUNTRY_ID == this.countryS)
        this.blog.CITY.CITY_ID = this.cities[0].CITY_ID
      }
    })

  }


  onSubmit() {
    this.blogService.setBlogFormGroup(this.blog);
    if (this.blogService.getBlogFormGroup().valid) {
      let blogObj = Object.assign({}, this.blogService.getBlogFormGroup().value)
      console.log(blogObj);

      if (blogObj.BLOG_ID == 0) {
        this.addBlog(blogObj);
      }
      else {
        this.updateBlog(blogObj);
      }
    }



  }
  addBlog(blog) {
    this.blogService.addBlog(blog).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService.swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose())
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }

  updateBlog(blog) {
    this.blogService.updateBlog(blog).subscribe(response => {
      if (response.m_eProcessState === 1) {
        this.messageService
          .swalSuccessMessage(response.m_lUserMessageList[0])
          .then(result => this.onClose());
      }
      else {
        this.messageService.swalErrorMessage(response.m_lUserMessageList[0])
      }
    })
  }
  onClose() {
    this.router.navigate(["admin/blog-list"]);
  }
}
