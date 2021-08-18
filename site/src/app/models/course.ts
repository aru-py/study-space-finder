import {Temporal} from '@js-temporal/polyfill';

export interface Course {
    course: string,
    days: number[]; // indices of the day of week, starting Sunday
    times: Temporal.PlainTime[]; // actually string at first
}
