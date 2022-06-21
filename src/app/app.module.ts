import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { NgxSpinnerModule } from "ngx-spinner";
//My componen
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { SettingComponent } from './components/setting/setting.component';
import { UploadComponent } from './components/upload/upload.component';
import { ContactComponent } from './components/contact/contact.component';
import { CounterComponent } from './components/counter/counter.component';
import { CountryComponent } from './components/countryAndCity/country/country.component';
import { CountryListComponent } from './components/countryAndCity/country-list/country-list.component';
import { CountryCityComponent } from './components/countryAndCity/country-city.component';

//Material
import { MatDialogModule } from '@angular/material/dialog';
//!Material
import { CityListComponent } from './components/countryAndCity/city-list/city-list.component';
import { CityComponent } from './components/countryAndCity/city/city.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { BlogCategoryListComponent } from './components/blogCategory/blog-category-list/blog-category-list.component';
import { BlogCategoryComponent } from './components/blogCategory/blog-category/blog-category.component';
import { BoolConverterPipe } from './pipes/bool-converter.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FilterCitiesPipe } from './pipes/filter-cities.pipe';
import { CompanyReferanceTypeListComponent } from './components/companyReferanceType/company-referance-type-list/company-referance-type-list.component';
import { CompanyReferanceTypeComponent } from './components/companyReferanceType/company-referance-type/company-referance-type.component';
import { CompanyReferanceListComponent } from './components/company-referance/company-referance-list/company-referance-list.component';
import { CompanyReferanceComponent } from './components/company-referance/company-referance/company-referance.component';
import { ExpertiseListComponent } from './components/expertise/expertise-list/expertise-list.component';
import { ExpertiseComponent } from './components/expertise/expertise/expertise.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyComponent } from './components/company/company/company.component';
import { InputsModule } from '@progress/kendo-angular-inputs';


import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { WhichCountryInCityPipe } from './pipes/which-country-in-city.pipe';
import { CheckOnGoingPipe } from './pipes/check-on-going.pipe';
import { SkillListComponent } from './components/skill/skill-list/skill-list.component';
import { SkillComponent } from './components/skill/skill/skill.component';
import { ReferanceListComponent } from './components/referance/referance-list/referance-list.component';
import { ReferanceComponent } from './components/referance/referance/referance.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuestionComponent } from './components/question/question/question.component';
import { PositionListComponent } from './components/position/position-list/position-list.component';
import { PositionComponent } from './components/position/position/position.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectComponent } from './components/project/project/project.component';
import { ProjectKategoriConverterPipe } from './pipes/project-kategori-converter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    SettingComponent,
    UploadComponent,
    ContactComponent,
    CounterComponent,
    CountryComponent,
    CountryListComponent,
    CountryCityComponent,
    CityListComponent,
    CityComponent,
    BlogListComponent,
    BlogComponent,
    BlogCategoryListComponent,
    BlogCategoryComponent,
    BoolConverterPipe,
    FilterCitiesPipe,
    CompanyReferanceTypeListComponent,
    CompanyReferanceTypeComponent,
    CompanyReferanceListComponent,
    CompanyReferanceComponent,
    ExpertiseListComponent,
    ExpertiseComponent,
    CompanyListComponent,
    CompanyComponent,
    WhichCountryInCityPipe,
    CheckOnGoingPipe,
    SkillListComponent,
    SkillComponent,
    ReferanceListComponent,
    ReferanceComponent,
    QuestionListComponent,
    QuestionComponent,
    PositionListComponent,
    PositionComponent,
    ProjectListComponent,
    ProjectComponent,
    ProjectKategoriConverterPipe,
  


  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    MatDialogModule,
    CKEditorModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
    NgbModule,



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
