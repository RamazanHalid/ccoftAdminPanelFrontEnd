import { ProjectComponent } from './components/project/project/project.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { PositionListComponent } from './components/position/position-list/position-list.component';
import { QuestionComponent } from './components/question/question/question.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { ReferanceListComponent } from './components/referance/referance-list/referance-list.component';
import { SkillComponent } from './components/skill/skill/skill.component';
import { SkillListComponent } from './components/skill/skill-list/skill-list.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { ExpertiseComponent } from './components/expertise/expertise/expertise.component';
import { ExpertiseListComponent } from './components/expertise/expertise-list/expertise-list.component';
import { CompanyReferanceListComponent } from './components/company-referance/company-referance-list/company-referance-list.component';
import { CompanyReferanceTypeComponent } from './components/companyReferanceType/company-referance-type/company-referance-type.component';
import { CompanyReferanceTypeListComponent } from './components/companyReferanceType/company-referance-type-list/company-referance-type-list.component';
import { BlogCategoryComponent } from './components/blogCategory/blog-category/blog-category.component';
import { BlogCategoryListComponent } from './components/blogCategory/blog-category-list/blog-category-list.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { CountryComponent } from './components/countryAndCity/country/country.component';
import { CityListComponent } from './components/countryAndCity/city-list/city-list.component';
import { CityComponent } from './components/countryAndCity/city/city.component';
import { CountryListComponent } from './components/countryAndCity/country-list/country-list.component';
import { CounterComponent } from './components/counter/counter.component';
import { ContactComponent } from './components/contact/contact.component';
import { UploadComponent } from './components/upload/upload.component';
import { LoginGuard } from './guards/login.guard';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SettingComponent } from './components/setting/setting.component';
import { CountryCityComponent } from './components/countryAndCity/country-city.component';
import { CompanyReferanceComponent } from './components/company-referance/company-referance/company-referance.component';
import { CompanyComponent } from './components/company/company/company.component';
import { ReferanceComponent } from './components/referance/referance/referance.component';
import { PositionComponent } from './components/position/position/position.component';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  {
    path: "admin", component: AdminComponent, canActivate: [LoginGuard], children: [
      {
        path: "setting", component: SettingComponent
      },
      {
        path: "contact", component: ContactComponent
      },
      {
        path: "counter", component: CounterComponent
      },
      {
        path: "country-city", component: CountryCityComponent
      },
      {
        path: "country-list", component: CountryListComponent
      },
      {
        path: "city-list", component: CityListComponent
      },
      {
        path: "city", component: CityComponent
      },
      {
        path: "country", component: CountryComponent
      },
      {
        path: "blog-list", component: BlogListComponent
      },
      {
        path: "blog", component: BlogComponent
      },
      {
        path: "blog-category-list", component: BlogCategoryListComponent
      },
      {
        path: "blog-category", component: BlogCategoryComponent
      },
      {
        path: "company-referance-type-list", component: CompanyReferanceTypeListComponent
      },
      {
        path: "company-referance-type", component: CompanyReferanceTypeComponent
      },
      {
        path: "company-referance-list", component: CompanyReferanceListComponent
      },
      {
        path: "company-referance", component: CompanyReferanceComponent
      },
      {
        path: "expertise-list", component: ExpertiseListComponent
      },
      {
        path: "expertise", component: ExpertiseComponent
      },
      {
        path: "company-list", component: CompanyListComponent
      },
      {
        path: "company/:companyId", component: CompanyComponent
      },
      {
        path: "skill-list", component: SkillListComponent
      },
      {
        path: "skill/:skillId", component: SkillComponent
      },
      {
        path: "referance-list", component: ReferanceListComponent
      },
      {
        path: "referance/:referanceId", component: ReferanceComponent
      },
      {
        path: "question-list", component: QuestionListComponent
      },
      {
        path: "question/:questionId", component: QuestionComponent
      },
      {
        path: "position-list", component: PositionListComponent
      },
      {
        path: "position/:positionId", component: PositionComponent
      },
      {
        path: "project-list", component: ProjectListComponent
      },
      {
        path: "project/:projectId", component: ProjectComponent
      },


    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
