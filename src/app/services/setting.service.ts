import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  apiUrl = 'https://webapi.cihancopur.com/Setting/';
  constructor(private httpClient: HttpClient) { }

  updateSettingTypes(settingId: any, typeId: number): Observable<any> {
    let newPath = this.apiUrl + 'Update?p_iTypeId=' + typeId;
    return this.httpClient.post(newPath, settingId);
  }
  getSettingForAnyTypeId(typeId: number): Observable<any> {
    let newPath = this.apiUrl + 'Get?p_iTypeId=' + typeId;
    return this.httpClient.get<any>(newPath);
  }



}
