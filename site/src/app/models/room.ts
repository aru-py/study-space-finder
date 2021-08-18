import {Course} from './course';
import {environment} from '../../environments/environment';
import {PT} from '../globals';


let now = environment.now;


export class Room {

    state = {open: true, occupancy: null, course: null, nextCourse: null};

    constructor(public name: string, public courses: Course[]) {

        for (let course of courses) {
            if (course.days.includes(now.day)) {
                // convert to `temporal`
                course.times = course.times.map(t => PT.from(t));

                // check if course is open
                if (this.state.open) {
                    // check if current time is between course
                    // start time and end time
                    if (course.times.map(t => PT.compare(now.time, t)).reduce(
                        (a, b) => a + b, 0) == 0) {
                        this.state.open = false;
                        this.state.occupancy = null;
                        this.state.course = course.course;
                    }
                }

                // get next course
                if (!this.state.nextCourse) {
                    if (PT.compare(now.time, course.times[0]) == -1) {
                        this.state.nextCourse = course;
                    }
                }

            }
        }
    }
}


