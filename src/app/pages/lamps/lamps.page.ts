import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lamps',
  templateUrl: './lamps.page.html',
  styleUrls: ['./lamps.page.scss'],
})
export class LampsPage implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onLogout() {
    this.alertCtrl.create({
      header: 'Are you sure to logout?',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.router.navigateByUrl('/auth');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl('/lamps/tabs/lamp-list');
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

}
