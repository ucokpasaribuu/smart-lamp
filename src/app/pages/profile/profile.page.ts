import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { from } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string;
  myTime: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.authService.userData.subscribe(data => {
      if (!data) {
        from(Plugins.Storage.get({key: 'userData'})).pipe(
          take(1),
          map(data => {
            console.log(data);
            return data;
          })
        ).subscribe(data => {
          this.email = data.value;
          this.myTime = +(new Date().getHours()) < 18 ? 'day800' : 'night800';
        })
      }
    })
  }

  ionViewWillEnter() {
    this.myTime = +(new Date().getHours()) < 18 ? 'day800' : 'night800';
  }

  onLogout() {
    this.alertCtrl.create({
      header: 'Are you sure to logout?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.authService.logout(false);
            this.router.navigateByUrl('/auth');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

}
