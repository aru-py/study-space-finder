import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../models/room';
import {environment} from '../../../environments/environment';
import {PT} from '../../globals';

let now = environment.now;

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {

    @Input() room: Room;
    @Input() selected: boolean;

    dayTimes = ['07:00', '18:30'].map(t => PT.from(t));
    schedule: { offset: number, width: number; }[] = [];
    nowBlock = this.interpolate(this.dayTimes[0].until(now.time));
    untilNext = null;

    interpolate(d) {
        let dayLength = this.dayTimes[0].until(this.dayTimes[1]);
        return (d.total({unit: 'seconds'}) / dayLength.total({unit: 'seconds'})) * 100;
    }

    ngOnInit() {
        // create schedule
        this.room.courses.forEach((course) => {
            if (course.days.includes(now.day)) {
                this.schedule.push({
                    offset: this.interpolate(this.dayTimes[0].until(course.times[0])),
                    width: this.interpolate(course.times[0].until(course.times[1])),
                });
            }
        });

        // get timing for next course
        if (this.room.state.nextCourse) {
            let until = now.time.until(this.room.state.nextCourse.times[0]);
            this.untilNext = (until.hours ? until.hours + ' hours, ' : '')
                + until.minutes + ' minutes';
        }

    }

}
