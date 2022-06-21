import { Title } from '@angular/platform-browser';

import { SettingService } from './../../services/setting.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactUpdateFormGroup: FormGroup;
  settingId2: any;
  constructor(private settingService: SettingService,
    private formBuilder: FormBuilder, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("İletişim")
    this.getSetting2();
    this.createSettingId2UpdateForm()
  }
  getSetting2() {
    this.settingService.getSettingForAnyTypeId(2).subscribe(response => {
      this.settingId2 = response.m_cData[0];

    })
  }
  createSettingId2UpdateForm() {
    this.contactUpdateFormGroup = this.formBuilder.group({
      CELL_PHONE: ["", Validators.required],
      PHONE: ["", Validators.required],
      EMAIL: ["", Validators.required],
      WEB_SITE: ["", Validators.required],
      GITHUB: ["", Validators.required],
      FACEBOOK: ["", Validators.required],
      TWITTER: ["", Validators.required],
      INSTAGRAM: ["", Validators.required],
      GOOGLE: ["", Validators.required],
      YOUTUBE: ["", Validators.required],
      LINKEDIN: ["", Validators.required],
      PINTEREST: ["", Validators.required],
      ADDRESS: ["", Validators.required],
    })
  }
  update() {
    this.settingId2.SETTING_ID = 1;
    this.settingService.updateSettingTypes(this.settingId2, 2).subscribe(response => {


      if (response.m_eProcessState == 1) {
        Swal.fire({
          title: 'Başarılı!',
          text: response.m_lUserMessageList[0],
          icon: 'success',
          confirmButtonText: 'Kapat'
        })
      }

    }, responseError => {
    })
  }
}
