import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forwardRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  apiUrl = 'https://webapi.cihancopur.com/File/';
  constructor(private httpClient: HttpClient) { }

  uploadImage(img: FormData): Observable<any> {
    let newPath = this.apiUrl + 'SaveImage';
    return this.httpClient.post(newPath, img, {
      headers: {
        "Content-type": 'multipart/form-data',
      }
    });

  }
  uploadImage2(file: File): Observable<any> {
    const fd: FormData = new FormData();

    fd.append("file", file);

    let newPath = this.apiUrl + 'SaveImage';
    return this.httpClient.post<any>(newPath, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}