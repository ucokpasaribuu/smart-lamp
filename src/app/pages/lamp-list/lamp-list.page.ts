import { Component, OnInit } from '@angular/core';
import { LamplistService } from 'src/app/services/lamplist.service';
import { LampList } from 'src/models/LampList.model';

@Component({
  selector: 'app-lamp-list',
  templateUrl: './lamp-list.page.html',
  styleUrls: ['./lamp-list.page.scss'],
})
export class LampListPage implements OnInit {
  lampList: LampList[];

  constructor(private lampListService: LamplistService) { }

  ngOnInit() {
    this.lampListService.lamps.subscribe(data => {
      this.lampList = data;
      console.log(this.lampList);
    })
  }

  changeStatus(value) {
    console.log(value.detail.checked);
  }

}
