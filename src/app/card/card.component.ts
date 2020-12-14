import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})

export class CardComponent implements OnInit {

@Input() data:any;
@Input() expand: boolean;

times = [];
result: any;
reserved = false;
currentOffset: any;

  constructor() { }

  ngOnInit() {

    let numHours = 8;

    this.result = this.data;
    // creates times for schedule from 7:30 am to 9:30 pm
    for(let startTime = moment("7:30 am","LT"), i = 0; i < numHours; i++) {
      this.times.push(startTime.add(2*i, "hour").format("h:mm a"))
    }

    // position for current timer bar
    this.currentOffset = (moment.duration(moment().diff(moment("7:30 am","LT"))).asMinutes()/numHours*60) * 100;

    for (let course of this.result.courses) {
      if (course.hasClassesToday != -1) {
          course.offset = (moment.duration(course.start.diff(moment("7:30 am","LT"))).asMinutes()/numHours*60) * 100;
          course.width = (moment.duration(course.end.diff(course.start)).asMinutes()/numHours*60) * 100;
        }
    }
  }

  print() {
    console.log(this.result);
  }

}
