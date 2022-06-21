import { SettingService } from './../../services/setting.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile:any = null;

  onFileSelected(event:any){
  this.selectedFile = event.target.files[0];

    
  }
  onUpload(){
    const fd = new FormData();
    fd.append("SLIDER", this.selectedFile, this.selectedFile.name);

  }
  constructor(private http: HttpClient, private settingService:SettingService) { }
  ngOnInit(): void {
  }


}
