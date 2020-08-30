import { Injectable } from '@angular/core';
import { LampList } from 'src/models/LampList.model';
import { BehaviorSubject } from 'rxjs';
import { tap, take, switchMap, map, filter } from 'rxjs/operators';
import { SiteModel } from 'src/models/Site.model';

@Injectable({
  providedIn: 'root'
})
export class LamplistService {
  lamps = new BehaviorSubject<LampList[]>([
    new LampList(
      'Lampu Tidur',
      'WTCBAT2020062500001',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'tebet',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      1
    ),
    new LampList(
      'Lampu Belajar',
      'WTCBAT2020062500002',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'tebet',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      2
    ),
    new LampList(
      'Lampu A',
      'WTCBAT2020062500003',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'depok',
      'Floor = 2, Room = 4, Spot = Atas Meja A',
      2
    ),
    new LampList(
      'Lampu B',
      'WTCBAT2020062500004',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'depok',
      'Floor = 2, Room = 4, Spot = Atas Meja B',
      1
    ),
    new LampList(
      'Lampu C',
      'WTCBAT2020062500005',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'depok',
      'Floor = 2, Room = 4, Spot = Atas Meja C',
      2
    ),
    new LampList(
      'Lampu D',
      'WTCBAT2020062500001',
      'Kosan Kelapa Dua, Jl, Kelapa Dua Barat No. 106 J',
      'kelapa_dua',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      1
    ),
    new LampList(
      'Lampu E',
      'WTCBAT2020062500002',
      'Kosan Kelapa Dua, Jl, Kelapa Dua Barat No. 106 J',
      'Kelapa Dua',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      2
    ),
    new LampList(
      'Lampu F',
      'WTCBAT2020062500003',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'depok',
      'Floor = 2, Room = 4, Spot = Atas Meja A',
      2
    ),
    new LampList(
      'Lampu G',
      'WTCBAT2020062500004',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'depok',
      'Floor = 2, Room = 4, Spot = Atas Meja B',
      1
    ),
    new LampList(
      'Lampu H',
      'WTCBAT2020062500005',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'depok',
      'Floor = 2, Room = 4, Spot = Atas Meja C',
      2
    ),
  ]);

  sites = new BehaviorSubject<SiteModel[]>([
    new SiteModel(
      'depok',
      'Depok',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja C'
    ),
    new SiteModel(
      'tebet',
      'Tebet',
      'Kosan depok, Jl, depok Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja C'
    ),
    new SiteModel(
      'kelapa_dua',
      'Kelapa Dua',
      'Kosan Kelapa Dua, Jl, Kelapa Dua Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja C'
    )
  ]);

  constructor() { }

  get getLampList() {
    return this.lamps.asObservable();
  }

  get getSites() {
    return this.sites.asObservable();
  }

  lampDetail(deviceCode) {
    return this.getLampList.pipe(
      take(1),
      map(lampDetail => {
        let indexLamp = lampDetail.findIndex(lamp => lamp.device_code === deviceCode);
        
        return lampDetail[indexLamp];
      })
    );
  }

  updateStatusLamp(deviceCode, status) {
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
          oldLamp.site_code,
          oldLamp.site_detail,
          +status
        );

        return updatedLampList;
      }),
      tap(updateLampList => {
        this.lamps.next(updateLampList);
      })
    );
  }

  filterLampList(value) {
    if (value === 'all') {
      return this.getLampList;
    } else {
      return this.lamps.pipe(
        take(1),
        map(lampList => {
          return lampList.filter(lamp => lamp.site_code === value);
        })
      )
    }
  }
}
