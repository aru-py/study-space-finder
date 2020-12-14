import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http'

import moment from 'moment';
import * as data from "./rooms.json";
import Fuse from 'fuse.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  query = "";
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  shownumber = 5;
  results: any;
  rooms: any;
  fuse: any;
  data: any;
  now: any;
  expand: string;


// search options
  options = {
    keys: ['room'],
    tokenize: false,
    threshold: 2
  };


  ngOnInit() {

    this.rooms = Object.keys((data as any).default).map((room) => ({
      room: room,
      courses: (data as any).default[room]
    }));

    this.fuse = new Fuse(this.rooms, this.options);

    // current time used for debugging
    this.now = moment();
  }

  constructor(private http: HttpClient) {
  }

  check(results: any) {
    results.forEach((classroom) => {
      classroom.open = true;
      classroom.class = "None";
      let timeUntilNextClass = 0;

      for (let course of classroom.courses) {
        // checks if course has classes today
        course.hasClassesToday = course.Days.indexOf(this.days[this.now.day() + 1]);
        // if course has classes calculate information
        if (course.hasClassesToday != -1) {
          // ***this should be precalculated
          let [startTime, endTime] = course.Times.split("-").map((time) => moment(time, "LT"));
          course.start = startTime;
          course.end = endTime;

          // checks time until next class
          if (startTime.isAfter(this.now)) {
            if (moment.duration(startTime.diff(this.now)).asMinutes() > timeUntilNextClass) {
              timeUntilNextClass = moment.duration(startTime.diff(this.now)).asMinutes();
              classroom.duration = moment.duration(startTime.diff(this.now)).humanize();
            }
          }

          // checks if class is in progress
          if (this.now.isBetween(course.start, course.end) && classroom.open == true) {
            classroom.open = false;
            classroom.class = course.Course;
          }

        }
      }
    });

    return results;
  }

  search(term: string) {
    this.results = this.check(this.fuse.search(term));
    this.http.post('https://studyspacefinder.firebaseio.com/searches.json',
      {
        "query":term,
        "time": moment().format('MMMM Do YYYY h:mm A ')
      }).subscribe(result => console.log(result));
  }

}
