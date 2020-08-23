import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;

  constructor(
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.authService.isAuth) {
      this.router.navigateByUrl('lamps/tabs/lamp-list');
    }
  }

  onSubmit(form: NgForm) {
    this.authService.login(true);
    this.router.navigateByUrl('/lamps/tabs/lamp-list');
  }
}
