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

}
