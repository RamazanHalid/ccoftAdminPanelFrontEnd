import { Title } from '@angular/platform-browser';
import { FileService } from './../../services/file.service';
import { SettingService } from './../../services/setting.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  settingUpdateFormGroup: FormGroup;
  settingId1: any;
  profileImage: string;
  sliderImage: string;
  progress: number = 0;
  progress2: number = 0;


  constructor(private formBuilder: FormBuilder,
    private settingService: SettingService,
    private fileService: FileService, private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Ayarlar")
    this.getSetting(1);
    this.createSettingId1UpdateForm()

  }
  getSetting(p_iTypeId: number) {
    this.settingService.getSettingForAnyTypeId(p_iTypeId).subscribe(response => {
      this.settingId1 = response.m_cData[0];
      this.profileImage = this.settingId1.PROFILE_IMAGE
      this.sliderImage = this.settingId1.SLIDER_IMAGE

    })
  }
  createSettingId1UpdateForm() {
    this.settingUpdateFormGroup = this.formBuilder.group({
      NAME_TR: ["", Validators.required],
      NAME_EN: ["", Validators.required],
      TITLE_TR: ["", Validators.required],
      TITLE_EN: ["", Validators.required],
      DESCRIPTION_TR: ["", Validators.required],
      DESCRIPTION_EN: ["", Validators.required],
      KEYWORD_TR: ["", Validators.required],
      KEYWORD_EN: ["", Validators.required],
      CV_LINK: ["", Validators.required]
    })
  }



  onProfileImageSelected(event) {
    const selectedFileProfile = event.target.files[0];
    this.fileService.uploadImage2(selectedFileProfile).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.profileImage = event.body.url;
          break;
        default:
          break;
      }
    });
  }

  onSliderImageSelected(event) {
    const selectedFileSlider = event.target.files[0];
    this.fileService.uploadImage2(selectedFileSlider).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress2 = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          this.sliderImage = event.body.url;
          break;
        default:
          break;
      }
    });
  }

  update() {
    if (this.sliderImage) {
      this.settingId1.SLIDER_IMAGE = this.sliderImage;
    }
    if (this.profileImage) {
      this.settingId1.PROFILE_IMAGE = this.profileImage;
    }
    this.settingId1.SETTING_ID = 1;
    this.settingService.updateSettingTypes(this.settingId1, 1).subscribe(response => {
      if (response.m_eProcessState == 1) {
        Swal.fire({
          title: 'Başarılı!',
          text: response.m_lUserMessageList[0],
          icon: 'success',
          confirmButtonText: 'Kapat'
        })
      } else {
        Swal.fire({
          title: 'Hata!',
          text: response.m_lUserMessageList[0],
          icon: 'error',
          confirmButtonText: 'Kapat'
        })
      }
    }, responseError3 => {
    })
  }

}


