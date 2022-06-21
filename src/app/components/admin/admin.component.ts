import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Yönetim")
  }
logout(){
  localStorage.removeItem("TOKEN");
}
}
