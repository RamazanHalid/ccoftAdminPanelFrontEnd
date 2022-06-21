import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private ToastrService: ToastrService, private SpinnerService: NgxSpinnerService,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Giriş")
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      USER_NAME: ["", Validators.required,],
      PASSWORD: ["", Validators.required]
    })
  }

  login() {
    this.SpinnerService.show();

    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {

        if (response.m_cDetail.m_eProcessState === 1) {
          localStorage.setItem("TOKEN", btoa(response.m_cData[0].GUID + ':' + loginModel.PASSWORD));
          this.SpinnerService.hide();
          this.router.navigate(["admin/setting"]);

        } else {
          this.ToastrService.error("Kullanıcı adı veya Şifre hatalı", "Lütfen tekrar deneyiniz")
          this.SpinnerService.hide();
        }
      }, responseError => {
      })
    }
    else {
      this.ToastrService.error("Lütfen tekrar deneyiniz", "Tüm alanların doldurulması zorunludur.")
      this.SpinnerService.hide();


    }
  }

}
