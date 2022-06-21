import { Title } from '@angular/platform-browser';
import { SettingService } from './../../services/setting.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counterUpdateFormGroup: FormGroup;
  settingId3: any;
  constructor(private settingService: SettingService, private formBuilder: FormBuilder, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sayaç")
    this.getSettingForType3();
    this.createSettingId3UpdateForm()
    console.log(this.settingId3);

  }


  createSettingId3UpdateForm() {
    this.counterUpdateFormGroup = this.formBuilder.group({
      COUNTER_TEXT1_TR: ["", Validators.required],
      COUNTER_TEXT1_EN: ["", Validators.required],
      COUNTER1: ["", Validators.required],
      COUNTER_TEXT2_TR: ["", Validators.required],
      COUNTER_TEXT2_EN: ["", Validators.required],
      COUNTER2: ["", Validators.required],
      COUNTER_TEXT3_TR: ["", Validators.required],
      COUNTER_TEXT3_EN: ["", Validators.required],
      COUNTER3: ["", Validators.required],
      COUNTER_TEXT4_TR: ["", Validators.required],
      COUNTER_TEXT4_EN: ["", Validators.required],
      COUNTER4: ["", Validators.required],
    })
  }

  getSettingForType3() {
    this.settingService.getSettingForAnyTypeId(3).subscribe(response => {
      this.settingId3 = response.m_cData[0];
    })
  }

  update() {
    this.settingId3.SETTING_ID = 1;
    this.settingService.updateSettingTypes(this.settingId3, 3).subscribe(response => {
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

    }, responseError => {
    })
  }
}

