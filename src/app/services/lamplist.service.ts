import { Injectable } from '@angular/core';
import { LampList } from 'src/models/LampList.model';
import { BehaviorSubject } from 'rxjs';

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
      'WTCBAT2020062500001',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja Komputer',
      2
    ),
    new LampList(
      'Lampu A',
      'WTCBAT2020062500001',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja A',
      2
    ),
    new LampList(
      'Lampu B',
      'WTCBAT2020062500001',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja B',
      1
    ),
    new LampList(
      'Lampu C',
      'WTCBAT2020062500001',
      'Kosan Tebet, Jl, Tebet Barat No. 106 J',
      'Floor = 2, Room = 4, Spot = Atas Meja C',
      2
    ),
  ]);

  constructor() { }
}
