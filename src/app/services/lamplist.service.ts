import { Injectable } from '@angular/core';
import { LampList } from 'src/models/LampList.model';
import { BehaviorSubject } from 'rxjs';
import { tap, take, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LamplistService {
  lamps = new BehaviorSubject<LampList[]>([
    new LampList(
      'Lampu Tidur',
      'WTCBAT2020062500001',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      1
    ),
    new LampList(
      'Lampu Belajar',
      'WTCBAT2020062500002',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      2
    ),
    new LampList(
      'Lampu A',
      'WTCBAT2020062500003',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja A',
      2
    ),
    new LampList(
      'Lampu B',
      'WTCBAT2020062500004',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja B',
      1
    ),
    new LampList(
      'Lampu C',
      'WTCBAT2020062500005',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja C',
      2
    ),
  ]);

  constructor() { }

  get getLampList() {
    return this.lamps.asObservable();
  }

  updateStatusLamp(deviceCode, status) {
    let updateStatus = status === true ? 1 : 2;

    return this.getLampList.pipe(
      take(1),
      map(lampList => {
        let updatePlaceIndex = lampList.findIndex(list => list.device_code === deviceCode);
        let updatedLampList = [...lampList];

        const oldLamp = lampList[updatePlaceIndex];

        updatedLampList[updatePlaceIndex] = new LampList(
          oldLamp.bat_name,
          oldLamp.device_code,
          oldLamp.site,
          oldLamp.site_detail,
          updateStatus
        );

        return updatedLampList;
      }),
      tap(updateLampList => {
        this.lamps.next(updateLampList);
      })
    );
  }
}
