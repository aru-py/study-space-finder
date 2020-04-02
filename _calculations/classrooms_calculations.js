/*
 classroom_calculations
 Aru Bhoop
 February 11, 2019
 */

const data = require("./classrooms_data.js");
const moment = require("../node_modules/moment");

// constant variables
const numHours = 9;
const daysInWeek = 5;
const avgSqftOfRoom = 800;

// Make javascript file usable by converting to key-value pairs
const classrooms = Object.keys(data.rooms).map((room) => (
  {
    key: room,
    value: data.rooms[room]
  }
));

let minutesUnusedPerWeek = 0;

for (let room of classrooms) {
  let minutesUsedPerWeek = 0;
  // Iterate over every course
  for (let course of room.value) {
    // find number of days with classes
    let numberOfDaysWithClasses = course.Days.split(",").length;

    // find duration of class
    let [startTime, endTime] = course.Times.split("-").map((t) => moment(t, "LT"));
    let classDuration = moment.duration(endTime.diff(startTime)).asMinutes();

    minutesUsedPerWeek += classDuration * numberOfDaysWithClasses;
  }

  // calculate number of minutes classroom is empty per week
  minutesUnusedPerWeek += (numHours * 60 * daysInWeek - minutesUsedPerWeek)

}

// find out on average number of free hours in an average classroom
const totalHoursUnusedPerWeek = minutesUnusedPerWeek / 60;
const totalHoursUnusedPerDay = totalHoursUnusedPerWeek / daysInWeek;
const classroomHoursUnusedPerDay = totalHoursUnusedPerDay / classrooms.length;
console.log("On average, a classroom is free for " + Math.round(classroomHoursUnusedPerDay) + " hours per day between the hours of eight to five.");

// calculate square footage and convert to dollars
const squareFeetHours = totalHoursUnusedPerDay * avgSqftOfRoom;




