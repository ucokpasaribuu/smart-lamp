import { Injectable } from '@angular/core';
import { Schedule } from 'src/models/Schedule.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

export interface ScheduleInterface {
    id: number;
    timeSchedule: string;
    deviceCode: string
}

@Injectable({providedIn: 'root'})

export class ScheduleService {
    timeSchedule = new BehaviorSubject<Schedule[]>([]);

    get allSchedule() {
        return this.timeSchedule.asObservable();
    }

    addSchedule(id: number, data: string, deviceCode: string) {
        let dataAdded = new Schedule(id, data, deviceCode);

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

    updateSchedule(id: number, timeSchedule: string, deviceCode: string) {
        let newSchedule = new Schedule(id, timeSchedule, deviceCode);
        console.log(id)

        return this.allSchedule.pipe(
            take(1),
            map(dataSchbeforeUpdate => {
                console.log(dataSchbeforeUpdate)
                let oldSchedule = [...dataSchbeforeUpdate];
                let indexUpdate = dataSchbeforeUpdate.findIndex(el => el.id === newSchedule.id);

                oldSchedule[indexUpdate] = newSchedule;

                let newUpdateSchedule = [...oldSchedule];

                return newUpdateSchedule;
            }),
            tap(updateAllSchedule => {
                this.timeSchedule.next(updateAllSchedule);
            })
        )
    }

    removeSchedule(id: number) {
        return this.allSchedule.pipe(
            take(1),
            map(allSchedule => {
                console.log(allSchedule);
                if (allSchedule.length > 0) {
                    console.log(+id);
                    console.log(allSchedule.filter(sch => sch.id !== +id));
                    return allSchedule.filter(sch => sch.id !== +id);
                } else {
                    return null;
                }
            }),
            tap(afterDelSchedule => {
                console.log(afterDelSchedule);
                if (afterDelSchedule !== null) {
                    this.timeSchedule.next(afterDelSchedule);
                } else {
                    this.timeSchedule.next([]);
                }
            })
        );
    }
}