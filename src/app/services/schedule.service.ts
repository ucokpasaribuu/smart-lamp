import { Injectable } from '@angular/core';
import { Schedule } from 'src/models/Schedule.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ScheduleService {
    timeSchedule = new BehaviorSubject<Schedule[]>([]);

    get allSchedule() {
        return this.timeSchedule.asObservable();
    }

    addSchedule(data: string) {
        let dataAdded = new Schedule(data);

        return this.allSchedule.pipe(
            take(1),
            map(dataSchedule => {
                return dataSchedule;
            }),
            tap(allSchedule => {
                this.timeSchedule.next(allSchedule.concat(dataAdded));  
            })
        );
    }
}