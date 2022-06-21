import { LoginResponseModel } from './../models/loginResponseModel';
import { LoginModel } from './../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponseModel } from '../models/generalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://webapi.cihancopur.com/Setting/Login";
  constructor(private httpClient: HttpClient) { }

  login(loginModel: LoginModel): Observable<GeneralResponseModel<LoginResponseModel>> {
    return this.httpClient.post<GeneralResponseModel<LoginResponseModel>>(this.apiUrl, loginModel)
  }

  isAuthenticated() {
    if (localStorage.getItem("TOKEN")) {
      return true;
    }
    else {
      return false;
    }
  }
}
